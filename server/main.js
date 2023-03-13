const express = require('express')
const bodyParser = require('body-parser')
const envSettings = require('dotenv').config().parsed
const app = express()
const TestRoutes = require('./routes/testRoutes')
const CreateLot = require('./routes/CreateLot')
const DbConnection = require ('./database/connection')
app.use(bodyParser.json({limit : '50mb', extended : true } ))
async function runServer () {
    const dbConnection = await new DbConnection().connect()
    console.log('server is running')
    const server = app.listen(envSettings.PORT, () => console.log('EVERYTHING IS OK'))

    return(0)
}

global.app = app


new TestRoutes()
new CreateLot()


runServer()
