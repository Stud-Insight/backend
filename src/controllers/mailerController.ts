import { Request, Response } from "express";
import nodemailer from "nodemailer";
import utils from "../utils/mailer";
import EmailSubjects from "@/enums/emailSubjects";

const trySendMail = async (email: string, subject: string) => {
  console.log(email,subject)
  utils.sendMail(email,EmailSubjects.notification)
}

export default { trySendMail };