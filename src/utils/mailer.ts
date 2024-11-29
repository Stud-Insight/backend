import { Request, Response } from "express";
import { Attachment } from "nodemailer/lib/mailer";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from 'fs';
import { promisify } from 'util';

import messageContent from "@/interfaces/messageContent";
import contentBySubj from "./emailContent";

const mustache = require('mustache');

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

const sendMail = async (receiver:string,lastName:string, name:string, subject:string) => {
  const htmlTemplate = await readFileAsync("./assets/mailTemplates/accountActivation.html", 'utf-8');

  const content:messageContent = contentBySubj(receiver, subject);

  const renderedTemplate = mustache.render(htmlTemplate, {
    receiver: lastName+" "+name,
    title: content.title,
    text: content.text,
    button: content.button
  });

  const mailOptions =  {
    from: "Stud'Insight <"+process.env.MAIL_CONTACT+">", // sender address
    to: receiver, // list of receivers
    subject: content.subject, // Subject line
    html:renderedTemplate, // plain text body
  }
  transporter
    .sendMail(mailOptions)
    .then(()=>{
      console.log({ message: "mail envoyé!"});
    })
    .catch((error)=>{
      console.log({ message: "échec de l'envoie :(", error});
    });
}

export default sendMail ;