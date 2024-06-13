const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require('dotenv')

app.use(cors())
app.use(bodyParser.json())
dotenv.config()


module.exports = app;