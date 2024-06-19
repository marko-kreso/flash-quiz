import sql, { PasswordChangeRequest } from "../utils/db"

import generateRandomValue from "../utils/tools"

import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
  },
});


export default defineEventHandler(async (event) => {
  const {userId}: {userId:string} = getQuery(event)

  if(!userId){
    setResponseStatus(event, 400)
    return
  }

  const [user]: [User?] = await sql`
    SELECT * FROM users WHERE email = ${userId} OR username = ${userId};
  `
  if(!user){
    setResponseStatus(event, 404)
    return
  }

  const token = await generateRandomValue(8)
  const salt = await generateRandomValue(8)

  const {count}:{count: Number} = await sql`
    INSERT INTO password_change_request (
      token, salt, username
    ) VALUES(sha256(${token} || ${salt}), ${salt}, ${user.username})
  `
  if(count != 1){
    throw Error('Cannot create request row')
  }

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: user.email,
    subject: "Giga Quiz Password Reset",
    text: `Password Reset:\nhttps://localhost:3000/resetPassword?token=${token}`,
  });

})
