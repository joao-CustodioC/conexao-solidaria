const db = require('./src/db/models')
require('dotenv').config()
const express = require('express')
const routes = require('./src/router/router')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)
app.get('/',  function (req, res) {
  res.send('Hello World')
})

app.listen(process.env.PORT, () => {
  console.log('Server started on port ' + process.env.PORT)
})
