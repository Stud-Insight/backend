import { promisify } from 'util';
import nodemailer from 'nodemailer';
import mustache from 'mustache';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import contentBySubj from './emailContent';

dotenv.config();
const readFileAsync = promisify(fs.readFile);

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Envoie d'un mail
 * @param receiver email du receveur
 * @param lastName prénom du receveur
 * @param name nom du receveur
 * @param subject sujet du mail
 * @param link lien de redirection vers le site
 */
const sendMail = async (receiver: string, lastName: string, name: string, subject: string, link?: string) => {
    const htmlTemplate = await readFileAsync(
        path.resolve(__dirname, '../../assets/mailTemplates/mailTemplate.html'),
        'utf-8'
    );

    const content = contentBySubj(subject);

    const renderedTemplate = mustache.render(htmlTemplate, {
        receiver: lastName + ' ' + name,
        title: content.title,
        text: content.text,
        link:link
    });

    const mailOptions = {
        from: "Stud'Insight <" + process.env.MAIL_CONTACT + '>',
        to: receiver,
        subject: content.subject,
        html: renderedTemplate,
    };

    transporter
        .sendMail(mailOptions)
        .then(() => {
            console.log(`[📨] Mail envoyé à ${mailOptions.to}`);
        })
        .catch((error: Error) => {
            console.error(`[📨❌] Erreur lors de l'envoi du mail à ${mailOptions.to} :`, error);
        });
};

export default sendMail;
