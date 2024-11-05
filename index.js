const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// Routes
app.use('/', require('./routes/test'));

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});