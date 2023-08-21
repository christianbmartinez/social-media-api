const { Schema, model } = require('mongoose')
const moment = require('moment')

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
      default: Date.now,
      get: (timestamp) =>
        moment(timestamp).format('MMMM Do YYYY [at] h:mm:ss a'),
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

UserSchema.virtual('friendCount').get(async () => {
  try {
    const friends = await this.friends
    if (friends) {
      return friends.length
    } else {
      return
    }
  } catch (err) {
    console.log(err)
  }
})

const User = model('User', UserSchema)

module.exports = User
