import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import config from 'config';

dotenv.config();

const app = express();
app.use(express.json());

import cors from 'cors';
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
import fileRoutes from "@routes/files";
app.use('/files', fileRoutes);

const PORT = config.get('server.port') || "8080";

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

/*
const user = new User({
    firstName: "Jeremy",
    lastName: "Dupont",
    email: "jeremy.dupont@gmail.com",
    activationDate: new Date(),
    password: "azerty"
});

user.save();
*/

/*const admin = new Role({
    name: "admin"
});

admin.save();*/

export default { db }