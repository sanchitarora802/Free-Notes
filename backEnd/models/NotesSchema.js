const {mongoose, Schema } = require('mongoose')

const notesSchema = new Schema({
    userid: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'user',
       required:true
    },
    title: {
      type: String,
      required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('notes',notesSchema);