-- name: CreateUser :exec
INSERT INTO users(user_name, email)
VALUES ($1, $2);

-- name: GetUser :one
SELECT users.user_name, email, banned, created_on, password FROM users INNER JOIN passwords USING (user_name)
WHERE users.user_name = $1 OR users.email = $1;


-- name: DeleteUser :exec
DELETE FROM  users
WHERE user_name = $1;


-- name: CreatePasswordReset :exec
INSERT INTO password_change_request (
    id, token, salt, user_name
) VALUES ($1, sha256($2 || $3), $3, $4);


-- name: GetPasswordReset :one
SELECT * FROM password_change_request WHERE
id = $1 
AND token = sha256(sqlc.arg('token') || salt) 
AND (now() - created_on) < '10 min'::interval;

-- name: CreatePassword :exec
INSERT INTO passwords (
    user_name
    ,password
) VALUES($1, $2);

-- name: UpdatePassword :exec
UPDATE passwords SET password = $2
WHERE user_name = $1;

