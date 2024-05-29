import postgres from 'postgres'
const sql = postgres()

interface UserWithPass {
    username: string;
    email: string;
    banned: boolean;
    createdOn: Date;
    password: string;
}

interface User{
    username: string;
    email: string;
    banned: boolean;
    createdOn: Date;
}
interface PasswordChangeRequest{
    id: string;
    token: string;
    username: string;
    salt: string;
    createdOn: Date;
}

export default sql
export type {UserWithPass as UserWithPass}
export type {User}
export type {PasswordChangeRequest}