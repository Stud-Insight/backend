import { Request, Response } from "express";
import { Attachment } from "nodemailer/lib/mailer";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from 'fs';
import { promisify } from 'util';

dotenv.config();

const readFileAsync = promisify(fs.readFile);

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


const sendMail = async (receivers:string, subject:string, template:string, firstName:string) => {
  const htmlTemplate = await readFileAsync(`./src/controllers/mailTemplates/${template}.html`, 'utf-8');
  const content =  {
    from: "Stud'Insight <"+process.env.MAIL_CONTACT+">", // sender address
    to: receivers, // list of receivers
    subject: subject, // Subject line
    html:htmlTemplate, // plain text body
  }
  transporter
    .sendMail(content)
    .then(()=>{
      console.log({ message: "mail envoyé!"});
    })
    .catch((error)=>{
      console.log({ message: "échec de l'envoie :(", error});
    });
}

//https://www.nodemailer.com/message/attachments/
const sendMailFile = async (receivers:string, subject:string, template:string, attachmentsList:Attachment[]) => {
  const htmlTemplate = await readFileAsync(`./src/controllers/mailTemplates/${template}.html`, 'utf-8');
  const content =  {
    from: "Stud'Insight <"+process.env.MAIL_CONTACT+">", // sender address
    to: receivers, // list of receivers
    subject: subject, // Subject line
    html:htmlTemplate, // plain text body
    attachments: attachmentsList, //Attachments list
  }
  transporter
    .sendMail(content)
    .then(()=>{
      console.log({ message: "mail envoyé!"});
    })
    .catch((error)=>{
      console.log({ message: "échec de l'envoie :(", error});
    });
}

export default { sendMail, sendMailFile };