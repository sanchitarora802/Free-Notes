const express = require('express')
import mongoose, { Schema } from 'mongoose'


const notesSchema = new Schema({
    title: {
      type: String
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