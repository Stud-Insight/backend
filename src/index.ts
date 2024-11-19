import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import config from 'config';
import cors from 'cors';
// Routes
import User from "./models/User";
import Role from "./models/Role";
import AcademicProject from "./models/AcademicProject";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
const db = process.env.DATABASE_URI as string || "";

mongoose.connect(db)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });


app.use('/auth', require("@routes/auth"))
app.use('/attachments', require("@routes/attachments"))

const PORT = config.get('server.port') || "8080";

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// test bdd à supprimer
const user = new User({
    firstName: "Jeremy",
    lastName: "Dupont",
    email: "jeremy.dupont@gmail.com",
    activationDate: new Date(),
    password: "azerty"
});
user.save();

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

export default { db }