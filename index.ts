import express from "express";
import dotenv from "dotenv";

import testRoute from "./routes/test";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/', testRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});