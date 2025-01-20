import MessageContent from '@/interfaces/MessageContent';
import EmailSubjects from '@/enums/emailSubjects';

/**
 * Renvoyer le contenu du mail selon son sujet
 * @param subject sujet du mail
 * @returns contenu du mail : un sujet lisible, un titre et le corps du mail
 */
const contentBySubj = (subject: string): MessageContent => {
    switch (subject) {
        case EmailSubjects.FIRST_CONNECT: {
            return {
                subject: 'Première connexion',
                title: "Stud'Insight vous souhaite la bienvenue !",
                text: `<p>La création de votre compte sur la plateforme Stud'Insight a bien été effectuée.</p>
                <p>Vous pouvez la finaliser en appuyant sur le bouton suivant, qui vous redirigera vers le site pour y créer votre mot de passe.</p>`,
            };
        }
        case EmailSubjects.NOTIFICATION: {
            return {
                subject: "Notifications de Stud'Insight",
                title: "Vous avez une notification de Stud'Insight",
                text: "pour l'instant RAS",
            };
        }
        case EmailSubjects.CHANGE_PASS: {
            return {
                subject: 'Changement de mot de passe',
                title: 'Changement de mot de passe',
                text: `Vous avez fait une demande de changement de mot de passe.<p> Si vous n'en êtes pas à l'origine, merci de nous le signaler via les contacts`,
            };
        }
        default: {
            return {
                subject: "Stud'Insight",
                title: "Default de Stud'Insight",
                text: `L'équipe de Stud'Insight vous souhaite la bienvenue dans le default !! <p> Faites comme chez vous, mais vous êtes un invité innattendu, il doit y avoir un problème quelque part ... <p> Merci de bien vouloir nous signaler ce mail afin que notre équipe puisse déterminer le problème`,
            };
        }
    }
};

export default contentBySubj;
