import { Request, Response } from "express";
import nodemailer from "nodemailer";
import sendMail from "../utils/mailer";
import EmailSubjects from "@/enums/emailSubjects";

const trySendMail = async (email: string, subject: string) => {
  console.log(email,subject)
  sendMail(email,"Nook","MAURICE",EmailSubjects.firstConnect)
}

export default { trySendMail };