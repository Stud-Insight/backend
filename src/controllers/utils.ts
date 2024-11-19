import { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from 'fs';
import { promisify } from 'util';

dotenv.config();

const readFileAsync = promisify(fs.readFile);

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587, //sinon 587
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


const sendMail = async (receiversList:string, subject:string, text:string) => {
  const htmlTemplate = await readFileAsync('./src/controllers/mailTemplate.html', 'utf-8');
  const content =  {
    from: "Stud'Insight <"+process.env.MAIL_CONTACT+">", // sender address
    to: receiversList, // list of receivers
    subject: subject, // Subject line
    html:htmlTemplate, // plain text body
  }
  transporter
    .sendMail(content)
    .then(()=>{
      console.log({ message: "mail envoyé!", contente: content });
    })
    .catch((error)=>{
      console.log({ message: "échec de l'envoie :(", error, content: content });
    });
}

export default { sendMail };