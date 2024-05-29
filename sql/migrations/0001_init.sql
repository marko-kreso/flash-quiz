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
    ,username TEXT UNIQUE REFERENCES users(username) ON DELETE CASCADE NOT NULL
    ,PRIMARY KEY (social_id, social_media)
);

CREATE TABLE IF NOT EXISTS card_sets(
    path TEXT  PRIMARY KEY
    ,username TEXT REFERENCES users(username) NOT NULL
    ,questions TEXT[] NOT NULL
    ,answers TEXT[] NOT NULL
    ,search TSVECTOR GENERATED ALWAYS AS(
        SETWEIGHT(TO_TSVECTOR('english', SUBSTRING(path, '/(\w+$)')), 'A')
        || SETWEIGHT(TO_TSVECTOR('english', ARRAY_TO_STRING(questions, ' ')), 'B')
        || SETWEIGHT(TO_TSVECTOR('english', ARRAY_TO_STRING(answers, ' ')), 'C')
    ) STORED
    ,created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS user_favorites(
    username TEXT REFERENCES users(username) ON DELETE CASCADE NOT NULL 
    ,set_user TEXT NOT NULL REFERENCES card_sets(username)
    ,path TEXT NOT NULL REFERENCES card_sets(path)
    ,PRIMARY KEY(username, set_user, path)
);

CREATE INDEX IF NOT EXISTS favorite_idx ON UserFavorites(set_user, path);

CREATE TABLE IF NOT EXISTS password_change_requests(
    id TEXT
    ,token Text UNIQUE NOT NULL
    ,username TEXT REFERENCES users(username) ON DELETE CASCADE NOT NULL 
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