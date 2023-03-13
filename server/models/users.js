const mongoose = require('mongoose')
const Model = mongoose.model
const Schema = mongoose.Schema
const userModule = 'userModule'


const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    surname: {
        type: String,
        required: true,
        unique: false
    },
    age: {
        type: Number,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    }


}, {
    collection : 'users',
    strictQuery: true
})


module.exports = ()=> new Model(userModule, schema)
