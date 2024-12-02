import { promisify } from "util";
import nodemailer from "nodemailer";
import mustache from 'mustache';
import dotenv from "dotenv";
import fs from "fs";
import contentBySubj from "./emailContent";

dotenv.config();
const readFileAsync = promisify(fs.readFile);

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async (receiver: string, lastName: string, name: string, subject: string) => {
  const htmlTemplate = await readFileAsync(
    "./assets/mailTemplates/accountActivation.html",
    "utf-8"
  );

  const content = contentBySubj(receiver, subject);

  const renderedTemplate = mustache.render(htmlTemplate, {
    receiver: lastName + " " + name,
    title: content.title,
    text: content.text,
    button: content.button,
  });

  const mailOptions = {
    from: "Stud'Insight <" + process.env.MAIL_CONTACT + ">",
    to: receiver,
    subject: content.subject,
    html: renderedTemplate,
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {
      console.log(`[📨] Mail envoyé à ${mailOptions.to}`);
    })
    .catch((error) => {
      console.error(`[📨❌] Erreur lors de l'envoi du mail à ${mailOptions.to} :`, error);
    });
};

export default sendMail;