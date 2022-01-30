const {Schema, model, ObjectId} = require('mongoose');


const File = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    cessLink: {type:String},
    size: {type: Number, default: 0},
    path: {type: String, default: ''},
    date: {type: String, default: new Date().toLocaleDateString()},
    user: {type: ObjectId, ref: 'User'},
    parent: {type: ObjectId, ref: 'File'},
    childs: [{type: ObjectId, ref: 'File'}],
})


module.exports = model('File', File);