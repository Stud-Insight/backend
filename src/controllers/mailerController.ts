import { Request, Response } from "express";
import nodemailer from "nodemailer";
import utils from "./utils";

//const envoyerMail = async (req:Request, res:Response) => {
const trySendMail = async (req:Request, res:Response) => {
  utils.sendMail("anouk.oms@caramail.fr","Mail par default!","default")
  .then(()=>{res.send("mail envoyé !")})
  .catch((error)=>{res.send({message:"Error !!", error:error})})
}

export default { trySendMail };