import express from "express";
import dotenv from "dotenv";

import testRoute from "@routes/test";
import User from "./models/User";
import Role from "./models/Role";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());

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
app.use('/', testRoute);

const PORT = process.env.PORT as string | "8080";

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


const user = new User({
    firstName: "Jeremy",
    lastName: "Dupont",
    email: "jeremy.dupont@gmail.com",
    activationDate: new Date(),
    password: "azerty"
});

user.save();


/*const admin = new Role({
    name: "admin"
});

admin.save();*/