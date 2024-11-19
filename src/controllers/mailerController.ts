import { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587, //sinon 587
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const content = {
  from: process.env.MAIL_CONTACT, // sender address
  to: "arthurdefays@gmail.com", // list of receivers
  subject: "Gun and Ships", // Subject line
  text: "LAFAYEEETTTTE t'as intérêt à marcher sinon je te ... !!", // plain text body
};

const envoyerMail = async (req: Request, res: Response) => {
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
