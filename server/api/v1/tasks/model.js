const mongoose = require('mongoose');
const { Schema } = mongoose


const references = {
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
  };
const TaskSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String,
    finishied: {
        type: Boolean,
        default: false
    }

},
    {
        timestamps: true
    })



module.exports = mongoose.model('Tasks', TaskSchema)