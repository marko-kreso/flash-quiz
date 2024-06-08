import postgres from 'postgres'

if(!process.env.POSTGRES_CONNECTION){
    throw Error("POSTGRES_CONNECTION NOT SPECIFIED")
}
const sql = postgres(process.env.POSTGRES_CONNECTION)

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