const mongoose = require('mongoose');
const {Schema} = mongoose

const UserSchema = new Schema({
    name: String,
    last_name: String,
    email: String,
},
{
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)