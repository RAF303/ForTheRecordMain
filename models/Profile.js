const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  // what you play
  status: {
    type: String,
    required: true
  },
  // what you're looking for
  status2: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  followng: {
    type: [String]
  },
  followers: {
    type: [String]
  },
  bio: {
    type: String
  },

  experience: [
    {
      title: {
        type: String,
        required: true
      },
      band: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],

  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
