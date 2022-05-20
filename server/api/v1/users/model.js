const mongoose = require('mongoose');
const { hash, compare } = require('bcryptjs');
const { Schema } = mongoose

const UserSchema = new Schema({
    name: String,
    last_name: String,
    email: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
},
    {
        timestamps: true
    })


UserSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.password = await hash(this.password, 10);
    }
    next();
});


UserSchema.methods.verifyPassword = function (password = '') {
    return compare(password, this.password);
};

UserSchema.methods.toJSON = function () {
    const doc = this.toObject();
    delete doc.password;
    return doc;
};

module.exports = mongoose.model('User', UserSchema)