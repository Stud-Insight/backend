import { Request, Response } from "express";
import nodemailer from "nodemailer";
import utils from "../utils/mailer";

const trySendMail = async (email: string, subject: string) => {
  console.log(email,subject)
  utils.sendMail(email,subject,"firstConnect")
}

export default { trySendMail };