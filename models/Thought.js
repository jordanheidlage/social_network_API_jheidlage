const { Schema, model, Types } = require('mongoose');
// const moment = require('moment');
const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => timeSince(date)
    }
},
{
    timestamps: true,
    toJSON: {getters: true, virtuals: true }
}
);




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
reactions: [reactionSchema]
},
{
    timestamps: true,
    toJSON: {getters: true, virtuals: true }
}
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought