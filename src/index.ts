import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';

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

// Routes
app.use('/auth', require("@routes/auth"))
app.use('/attachments', require("@routes/attachments"))

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});