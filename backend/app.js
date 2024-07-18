const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use('/uploads', express.static('./src/uploads'));
dotenv.config();

module.exports = app;
