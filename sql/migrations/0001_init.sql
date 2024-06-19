-- +migrate Up

CREATE TABLE IF NOT EXISTS users(
    username TEXT PRIMARY KEY
    ,email TEXT UNIQUE NOT NULL
    ,banned BOOLEAN DEFAULT false NOT NULL
    ,created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE INDEX IF NOT EXISTS email_idx ON users(email);


CREATE TABLE IF NOT EXISTS passwords(
    username TEXT PRIMARY KEY REFERENCES users(username) ON DELETE CASCADE
    ,password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS social_users(
     social_id TEXT NOT NULL
    ,social_media TEXT NOT NULL
    ,username TEXT UNIQUE NOT NULL REFERENCES users(username) ON DELETE CASCADE NOT NULL
    ,PRIMARY KEY (social_id, social_media)
);

CREATE EXTENSION LTREE;
CREATE TABLE folders(
    path LTREE PRIMARY KEY
);
CREATE INDEX folder_path_gist_idx ON folders USING GIST (path gist_ltree_ops(siglen=128));

CREATE FUNCTION immutable_array_to_string(arr ANYARRAY, sep TEXT)
    RETURNS text
    AS $$SELECT array_to_string(arr, sep);$$
    LANGUAGE SQL
    IMMUTABLE
  ;

-- TEST if index will work later
CREATE TABLE IF NOT EXISTS card_sets(
    path LTREE GENERATED ALWAYS AS(
        folder || text2ltree(name)
    ) STORED PRIMARY KEY
    ,folder LTREE NOT NULL REFERENCES folders(path) ON DELETE CASCADE
    , name TEXT NOT NULL
    ,username TEXT REFERENCES users(username) NOT NULL
    ,questions TEXT[] NOT NULL
    ,answers TEXT[] NOT NULL
    ,search TSVECTOR GENERATED ALWAYS AS(
        SETWEIGHT(TO_TSVECTOR('english', name), 'A')
        || SETWEIGHT(TO_TSVECTOR('english', IMMUTABLE_ARRAY_TO_STRING(questions, ' ')::text), 'B')
        || SETWEIGHT(TO_TSVECTOR('english', IMMUTABLE_ARRAY_TO_STRING(answers, ' ')::text), 'C')
    ) STORED
    ,created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX card_path_gist_idx ON card_sets USING GIST (path gist_ltree_ops(siglen=128));
CREATE INDEX card_text_gist_idx ON card_sets USING GIN (search);

CREATE TABLE IF NOT EXISTS user_favorites(
    username TEXT REFERENCES users(username) ON DELETE CASCADE NOT NULL
    ,path LTREE NOT NULL REFERENCES card_sets(path) 
    ,PRIMARY KEY(username, path)
);

CREATE INDEX IF NOT EXISTS favorite_idx ON user_favorites(set_user, path);

CREATE TABLE IF NOT EXISTS password_change_requests(
    token Text PRIMARY KEY
    ,username TEXT REFERENCES users(username) ON DELETE CASCADE NOT NULL 
    ,salt TEXT NOT NULL
    ,created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- +migrate Down
DROP INDEX IF EXISTS favorite_idx;
DROP TABLE IF EXISTS user_favorites;
DROP INDEX IF EXISTS card_path_gist_idx;
DROP INDEX IF EXISTS card_text_gist_idx; 
DROP TABLE IF EXISTS card_sets;
DROP INDEX IF EXISTS folder_path_gist_idx;
DROP TABLE IF EXISTS folders;
DROP TABLE IF EXISTS social_users;
DROP TABLE IF EXISTS passwords;
DROP INDEX IF EXISTS email_idx;
DROP TABLE IF EXISTS password_change_requests;
DROP TABLE IF EXISTS users;
DROP EXTENSION IF EXISTS LTREE;
DROP FUNCTION IF EXISTS immutable_array_to_string;