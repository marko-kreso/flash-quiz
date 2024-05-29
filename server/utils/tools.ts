import crypto from 'crypto'
function generateRandomValue(size:number): Promise<string>{
return new Promise((resolve, reject)=>{
        crypto.randomBytes(size, function(err, buffer){
            if(err){
              reject(err)
            }
            else{
              resolve(buffer.toString('base64'))
            } 
        })
      })

}
export default generateRandomValue