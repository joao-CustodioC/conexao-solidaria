const db = require('./src/models')
require('dotenv').config()
const express = require('express')
const routes = require('./src/router/router')
const cors = require('cors')

// ADICIONADOS:
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./docs/swagger')

const app = express()
app.use(cors())
app.use(express.json())

// DOCUMENTAÇÃO SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(routes)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(process.env.PORT, () => {
  console.log('Server started on port ' + process.env.PORT)
  console.log(`Swagger disponível em http://localhost:${process.env.PORT}/api-docs`)
})
