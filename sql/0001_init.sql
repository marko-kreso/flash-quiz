-- +migrate Up
CREATE TABLE IF NOT EXISTS users(
    user_name TEXT PRIMARY KEY
    ,email TEXT UNIQUE NOT NULL
    ,banned BOOLEAN DEFAULT false NOT NULL
    ,created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE INDEX IF NOT EXISTS email_idx ON users(email);


CREATE TABLE IF NOT EXISTS passwords(
    user_name TEXT PRIMARY KEY REFERENCES users(user_name) ON DELETE CASCADE
    ,password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS social_users(
     social_id TEXT NOT NULL
    ,social_media TEXT NOT NULL
    ,user_name TEXT UNIQUE REFERENCES users(user_name) ON DELETE CASCADE NOT NULL
    ,PRIMARY KEY (social_id, social_media)
);

CREATE TABLE IF NOT EXISTS card_sets(
    user_name TEXT REFERENCES users(user_name) NOT NULL,
    ,path TEXT NOT NULL
    ,questions TEXT[] NOT NULL
    ,answers TEXT[] NOT NULL
    ,search TSVECTOR GENERATED ALWAYS AS(
        SETWEIGHT(TO_TSVECTOR('english', SUBSTRING(path, '/(\w+$)')), 'A')
        || SETWEIGHT(TO_TSVECTOR('english', ARRAY_TO_STRING(questions, ' ')), 'B')
        || SETWEIGHT(TO_TSVECTOR('english', ARRAY_TO_STRING(answers, ' ')), 'C')
    ) STORED
    ,created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    ,PRIMARY KEY (user_name, path)
);

CREATE TABLE IF NOT EXISTS user_favorites(
    user_name TEXT REFERENCES users(user_name) ON DELETE CASCADE NOT NULL 
    ,set_user TEXT NOT NULL REFERENCES card_sets(user_name)
    ,path TEXT NOT NULL REFERENCES card_sets(path)
    ,PRIMARY KEY(user_name, set_user, path)
);

CREATE INDEX IF NOT EXISTS favorite_idx ON UserFavorites(set_user, path);

CREATE TABLE IF NOT EXISTS password_change_request(
    id TEXT
    ,token Text UNIQUE NOT NULL
    ,user_name TEXT REFERENCES users(user_name) ON DELETE CASCADE NOT NULL 
    ,salt TEXT NOT NULL
    ,created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    ,PRIMARY KEY(id) 
);

-- +migrate Down
DROP INDEX IF EXISTS favorite_idx;
DROP TABLE IF EXISTS user_favorites;
DROP TABLE IF EXISTS card_sets;
DROP TABLE IF EXISTS social_users;
DROP TABLE IF EXISTS passwords;
DROP INDEX IF EXISTS email_idx;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS password_change_request;