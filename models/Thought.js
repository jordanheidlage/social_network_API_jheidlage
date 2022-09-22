const { Schema, model, Types } = require('mongoose');
// const moment = require('moment');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => timeSince(date)
    },
    username: {
        type: String,
        required: true
    },
    reactions: {

    },
},
{
    timestamps: true,
    toJSON: {getters: true, virtuals: true }
}
);