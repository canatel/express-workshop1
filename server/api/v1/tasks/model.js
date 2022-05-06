const mongoose = require('mongoose');
const { Schema } = mongoose

const TaskSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: String,

},
    {
        timestamps: true
    })

module.exports = mongoose.model('Tasks', TaskSchema)