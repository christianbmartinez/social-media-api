const { Schema, model, Types } = require('mongoose')
const dayjs = require('dayjs')

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date) => dayjs(date).format('MM/DD/YYYY'),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
)

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date) => dayjs(date).format('MM/DD/YYYY'),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },

  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
)

ThoughtSchema.virtual('reactionCount').get(async () => {
  try {
    const reactions = await this.reactions
    if (reactions) {
      return reactions.length
    } else {
      return
    }
  } catch (err) {
    console.log(err)
  }
})

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought
