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

const envoyerMail = async (req: Request, res: Response) => {
  const htmlTemplate = await readFileAsync('./src/controllers/mailTemplate.html', 'utf-8');
  const content = {
    from: "Stud'Insight <"+process.env.MAIL_CONTACT+">", // sender address
    to: "arthur.defays@gmail.com, aoto.taga.34@gmail.com", // list of receivers
    subject: "Gun and Ships", // Subject line
    html:htmlTemplate,
  };
  transporter
    .sendMail(content)
    .then(() => {
      res.send({ message: "mail envoyé!", contente: content });
    })
    .catch((error) => {
      res.send({ message: "échec de l'envoie :(", error, content: content });
    });

  //res.send({ message: `Route d'envoie de mail ${req.method}` });
};

export default { envoyerMail };
