import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
    idOrigin: {
        type: String,
        required: true,
        index: true
    },
    idDestiny: {
        type: String,
        required: true,
        index: true
    },
    text: String,
    imgs: [{
        type: String
    }],
    audio: [{
        type: String
    }]
});