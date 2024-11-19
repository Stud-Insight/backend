import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import config from 'config';

dotenv.config();

const app = express();
app.use(express.json());

import cors from 'cors';
import User, { IUser } from "./models/User";
import { getPermissionsFromRolesIds, getPermissionsFromUserId, getRoles, getRolesFromUserId } from "./utils/roles";
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

// Routes
app.use('/auth', require("@routes/auth"))
app.use('/attachments', require("@routes/attachments"))

const PORT = config.get('server.port') || "8080";

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


async function test() {
    const user = new User({
        firstName: "Jeremy",
        lastName: "Dupont",
        email: "jeremy.dupont@gmail.com",
        activationDate: new Date(),
        password: "azerty"
    });
    //await user.save();
    const jeremy = await User.findOne({ email: "jeremy.dupont@gmail.com" }) as IUser;
    //console.log(jeremy);
    //console.log(jeremy.id);

    console.log(await getRolesFromUserId('673ccd2dd4e93ab7ea50a59e'));

}

test();

/*const admin = new Role({
    name: "admin"
});

admin.save();*/

export default { db }