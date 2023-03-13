const mongoose = require('mongoose')
const envSettings = require('dotenv').config().parsed
const users = require('../models/users')
const draw = require('../models/lottery_draw')
module.exports = class DbConnection{
    _isConnected = false
    _connectionPath = ''

    connect = ()=>{
        return new Promise((resolve, reject)=>{
            this._isConnected ? resolve(this) : mongoose.connect(this._connectionPath, {
                useNewUrlParser: true, //изучить
                // useFindAndModify: true,
                // useCreateIndex: true,
                useUnifiedTopology: true
            }).then(()=>{
                users()
                draw()
                console.log('db connected');
                resolve(this)
            }).catch((error)=>{
                reject(error)
            })



        })
    };
    disconnect = ()=>{
        return mongoose.disconnect()
    };

    constructor(host = envSettings.DB_HOST, port = envSettings.DB_PORT, name = envSettings.DB_NAME) {
        this._connectionPath = `mongodb://${host}:${port}/${name}`

    }

    //errorhandler

}