import {z} from 'zod'
export function pathSchema(username:string){
  return z.string()
        .max(256)
        .startsWith(`/users/${username}`)
        //valid path regex
        .regex(/^\/([a-zA-z0-9][a-zA-z0-9 ]+[a-zA-Z0-9]\/)*[a-zA-z0-9][a-zA-z0-9 ]+[a-zA-Z0-9]$/g)
        .transform((path)=>path.replace('/users','').replaceAll(' ','_').replaceAll('/','.').slice(1))
}
