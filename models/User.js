const { Schema, model } = require('mongoose')
const dayjs = require('dayjs')

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date) => dayjs(date).format('MM/DD/YYYY'),
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

UserSchema.virtual('friendCount').get(() => this.friends.length)

const User = model('User', UserSchema)

module.exports = User
