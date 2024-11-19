import { Request, Response } from "express";
import nodemailer from "nodemailer";
import utils from "./utils";


//const envoyerMail = async (req:Request, res:Response) => {
const trySendMail = async (req:Request, res:Response) => {
  utils.sendMail("anouk.oms@caramail.fr,anouk.comb@gmail.com","ÇA MAAAAAAAARCHE !!","In sleep he sang to me,\n in dreams he came")
  .then(()=>{res.send("mail envoyé !")})
  .catch((error)=>{res.send({message:"Error !!", error:error})})
}

export default { trySendMail };