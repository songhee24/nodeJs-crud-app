require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const cors = require('cors');

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');


app.listen(process.env.PORT || 3000, () => {
    console.log(`App running on port ${process.env.PORT || 3000}.`)
})

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API Application for students' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
