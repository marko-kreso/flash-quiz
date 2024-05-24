BEGIN

CREATE TABLE IF NOT EXISTS users(
    userName TEXT PRIMARY KEY
    ,banned BOOLEAN DEFAULT FALSE NOT NULL
    ,createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
)

CREATE TABLE IF NOT EXISTS passwords(
    userName TEXT PRIMARY KEY REFERENCES users(userName) NOT NULL
    ,password TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS socialIds(
    sid TEXT NOT NULL
    ,socialNetwork TEXT NOT NULL
    ,userName REFERENCES users(userName) NOT NULL
    ,PRIMARY KEY (sid, socialNetwork)
);

CREATE TABLE IF NOT EXISTS cardSets(
    userName TEXT REFERENCES users(userName)
    ,path TEXT NOT NULL
    ,data JSONB NOT NULL
    ,search TSVECTOR GENERATED ALWAYS AS to_tsvector('english', STRING_TO_ARRAY(path, '/')[array_upper(STRING_TO_ARRAY(path, '/'), 1)]) 
    || to_tsvector('english', data['question'])  
    || to_tsvector('english', data['answer'])
    STORED
    ,public BOOLEAN DEFAULT false
    ,PRIMARY KEY (userNAME, path)
);
CREATE INDEX cardSearch ON cardSets USING GIN(search);
