import { Request, Response } from "express";
import nodemailer from "nodemailer";
import utils from "../utils/mailer";

//const envoyerMail = async (req:Request, res:Response) => {
const trySendMail = async (email: string, subject: string) => {
  console.log(email,subject)
  utils.sendMail(email,subject,"firstTry")
}

export default { trySendMail };