import { Request, Response } from "express";
import nodemailer from "nodemailer";
import utils from "./utils";

//const envoyerMail = async (req:Request, res:Response) => {
const trySendMail = async (req:Request, res:Response) => {
  utils.sendMail("kilod54605@exoular.com","Mail par default!","new") //  ./src/controllers/test.txt
  //utils.sendMailFile("lucile.bascoul15@gmail.com","Première connexion","default",[{path:"./src/controllers/test.txt"}]) //  ./src/controllers/test.txt
  .then(()=>{res.send("mail envoyé !")})
  .catch((error)=>{res.send({message:"Error !!", error:error})})
}

export default { trySendMail };