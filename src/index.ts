import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import config from 'config';
import cors from 'cors';
import { getRolesFromUserId } from "./utils/roles";
// Routes
import User from "./models/User";
import Role from "./models/Role";
import AcademicProject from "./models/AcademicProject";
import genActivationToken from "./controllers/generators/activationTokenGen";
import IUser from "./interfaces/IUser";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 8080;
const DATABASE_URI = process.env.DATABASE_URI || "";

app.use(express.json());

app.use(cors());

// Connexion à MongoDB
mongoose.connect(DATABASE_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });


app.use('/auth', require("@routes/auth"))
app.use('/attachments', require("@routes/attachments"))

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


async function test() {
    const user = new User({
        firstName: "Jeremy",
        lastName: "Dupont",
        email: "jeremy.dupont@gmail.com",
    });
    await user.save();
    const jeremy = await User.findOne({ email: "jeremy.dupont@gmail.com" }) as IUser;
    //console.log(jeremy);
    //console.log(jeremy.id);

    const activationToken = genActivationToken({ id: jeremy.id });

    await User.findOneAndUpdate({ email: "jeremy.dupont@gmail.com" }, {
        activationToken
    });

}

test();

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