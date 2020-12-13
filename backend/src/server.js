const express = require('express')
const routes = require('./routes.js')
const cors = require('cors')

require('dotenv').config()
require('./database')

const app = express()

app.use(cors())
app.listen(3000)
app.use(express.json())
app.use(routes)