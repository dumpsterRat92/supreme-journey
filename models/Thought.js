const { model, Schema } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionsCount').get(function () {
    return this.reactions.length;
});

thoughtSchema.virtual('formattedDate').get(function () {
    return this.createdAt.toLocaleString();
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
