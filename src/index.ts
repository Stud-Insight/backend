import express from "express";
import dotenv from "dotenv";

import testRoute from "@routes/test";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());

// Routes
app.use('/', testRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});