const mongoose = require('mongoose')
const Model = mongoose.model
const Schema = mongoose.Schema
const drawModule = 'drawModule'

const schema = new Schema({
    date:{
        type: Number,
        required: true,
        unique: true
    },
    draw:{
        type: String,
        required: true,
        unique: false
    },
    winnerList:{
        type: [],
        required: true,
        unique: false
    }

}, {
    collection: 'draws',
    strictQuery: true
})


module.exports = ()=> new Model(drawModule, schema)