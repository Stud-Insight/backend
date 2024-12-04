import { Request, Response } from "express";
import nodemailer from "nodemailer";
import utils from "../utils/mailer";

//const envoyerMail = async (req:Request, res:Response) => {
const trySendMail = async (email: string, subject: string, firstName: string) => {
  console.log(email,subject,firstName)
  utils.sendMail(email,subject,"firstTry",firstName)
}

export default { trySendMail };