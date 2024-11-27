import express from "express";
import dotenv from "dotenv";

import testRoute from "@/routes/test";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());

// Routes
app.use('/', testRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


async function Jeremy() {
    const user = new User({
        firstName: "Jeremy",
        lastName: "Dupont",
        email: "jeremy.dupont@gmail.com",
    });
    await user.save();
    const jeremy = await User.findOne({ email: "jeremy.dupont@gmail.com" }) as IUser;
    //console.log(jeremy);
    //console.log(jeremy.id);

}

const createUser = async (firstNameVar: string, lastNameVar: String, emailVar: string) => {
    console.log('creatUser')
    const user = new User({
        firstName: firstNameVar,
        lastName: lastNameVar ,
        email: emailVar,
        password: null 
    });
    const activationToken = genActivationToken({ id: user.id });

    await User.findOneAndUpdate({ email: emailVar }, {
        activationToken
    });
    user.save();
    
    mailerController.trySendMail(emailVar,'première connexion', firstNameVar)
}
console.log('test')
createUser("Aoto","taga","aoto.taga.34@gmail.com");

/*
const getId = async ()=> {
    const p = await User.findOne({lastName:"Dupont"}).exec();
    console.log(p)
    const idpersonne = p?.id
    return idpersonne
}

const createStage = async () =>{
    const idp = await getId()
    console.log(idp)
    const stage = new AcademicProject({
        student: idp,
        referent: idp,
        supervisor: idp,
        subject: "T.E.R L3",
        type: "Internship",  
        startDate: Date.now(),
        finalDate: Date.now(),
    })
    stage.save();
}


createStage()

const admin = new Role({
    name: "admin"
});
admin.save();

export default { db }*/