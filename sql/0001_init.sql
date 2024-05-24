-- +migrate Up
CREATE TABLE IF NOT EXISTS users(
    userName TEXT PRIMARY KEY
    ,email TEXT UNIQUE NOT NULL
    ,banned BOOLEAN DEFAULT false NOT NULL
    ,createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE INDEX IF NOT EXISTS emailIdx ON users(email);


CREATE TABLE IF NOT EXISTS passwords(
    userName TEXT PRIMARY KEY REFERENCES users(userName)
    ,password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS socialUsers(
    socialID TEXT NOT NULL
    ,socialMedia TEXT NOT NULL
    ,userName TEXT UNIQUE REFERENCES users(userName) NOT NULL
    ,PRIMARY KEY (socialID, socialMedia)
);

CREATE TABLE IF NOT EXISTS cardSets(
    userName TEXT REFERENCES users(userName) NOT NULL,
    ,path TEXT NOT NULL
    ,questions TEXT[] NOT NULL
    ,answers TEXT[] NOT NULL
    ,search TSVECTOR GENERATED ALWAYS AS(
        SETWEIGHT(TO_TSVECTOR('english', SUBSTRING(path, '/(\w+$)')), 'A')
        || SETWEIGHT(TO_TSVECTOR('english', ARRAY_TO_STRING(questions, ' ')), 'B')
        || SETWEIGHT(TO_TSVECTOR('english', ARRAY_TO_STRING(answers, ' ')), 'C')
    ) STORED
    ,createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    ,PRIMARY KEY (userName, path)
);

CREATE TABLE IF NOT EXISTS userFavorites(
    userName TEXT REFERENCES users(userName) NOT NULL
    ,setUser TEXT NOT NULL REFERENCES cardSets(userName)
    ,path TEXT NOT NULL REFERENCES cardSets(path)
    ,PRIMARY KEY(userName, setUser, path)
);

CREATE INDEX IF NOT EXISTS favoriteIdx ON userFavorites(setUser, path);

-- +migrate Down
DROP INDEX IF EXISTS favoriteIdx;
DROP TABLE IF EXISTS userFavorites;
DROP TABLE IF EXISTS cardSets;
DROP TABLE IF EXISTS socialUsers;
DROP TABLE IF EXISTS passwords;
DROP INDEX IF EXISTS emailIdx;
DROP TABLE IF EXISTS users;