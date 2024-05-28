-- name: CreateUser :exec
INSERT INTO users(user_name, email)
VALUES ($1, $2);

-- name: GetUser :one
SELECT * FROM  users
WHERE email = $1 OR user_name = $1;


-- name: DeleteUser :exec
DELETE FROM  users
WHERE user_name = $1;


-- name: CreatePasswordReset :exec
INSERT INTO password_change_request (
    id, token, salt, user_name
) VALUES ($1, sha256($2 || $3), $3, $4);


-- name: GetPassowordReset :one
SELECT * FROM password_change_request WHERE
id = $1 
AND token = sha256($2 || salt) 
AND (now() - created_on) < '10 min'::interval;

-- name: CreatePassword :exec
INSERT INTO passwords (
    user_name
    ,password
) VALUES($1, $2);

-- name: UpdatePassword :exec
UPDATE passwords SET password = $2
WHERE user_name = $1;

