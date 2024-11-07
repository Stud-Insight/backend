import express from "express";
import dotenv from "dotenv";

import testRoute from "@routes/test";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

// Routes
app.use('/', testRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});