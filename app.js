const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taxesRouter = require('./routes/taxesRouter');
const app = express();
const port = 3000;

const db = mongoose.connect('mongodb://localhost:27017/');

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/Taxes', taxesRouter);
