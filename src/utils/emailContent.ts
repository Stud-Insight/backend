import messageContent from "@/interfaces/messageContent";
import EmailSubjects from "@/enums/emailSubjects";

const contentBySubj = (receiver:string, subject:string):messageContent => {
  switch(subject){
    case EmailSubjects.firstConnect:{
      return {
        subject: "Première connexion",
        title:"Stud'Insight vous souhaite la bienvenue !",
        text:"La création de votre compte sur la plateforme Stud'Insight a bien été effectuée.\nVous pouvez la finaliser en appuyant sur le bouton suivant, qui vous redirigera vers le site pour y créer votre mot de passe.",
        button:"Entrer à Stud'Insight",
        link:"http://example.com/"
      };
    }
    case EmailSubjects.notification:{
      return {
        subject: "Notifications de Stud'Insight",
        title:"Vous avez une notification de Stud'Insight",
        text:"pour l'instant RAS",
        button:"Aller sur Stud'Insight",
        link:"http://example.com/"
      };
    }
    case EmailSubjects.changePass:{
      return {
        subject: "Changement de mot de passe",
        title:"Changement de mot de passe",
        text:"Vous avez fait une demande de changement de mot de passe.\n Si vous n'en êtes pas à l'origine, merci de nous le signaler via les contacts",
        button:"Changer le mot de passe",
        link:"http://example.com/"
      };
    }
    default :{
      return {
        subject: "Stud'Insight",
        title:"Default de Stud'Insight",
        text:"L'équipe de Stud'Insight vous souhaite la bienvenue dans le default !! \n Faites comme chez vous, mais vous êtes un invité innattendu, il doit y avoir un problème quelque part ... \n Merci de bien vouloir nous signaler ce mail afin que notre équipe puisse déterminer le problème",
        button:"Default de Stud'Insight",
        link:"http://example.com/"
      };
      console.log("Welcome in the Default of emailContent.ts !!")
    }
  }
}

export default contentBySubj;