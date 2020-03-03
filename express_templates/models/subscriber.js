const mongoose = require('mongoose');

// add Mongoose schemas
const subscriberSchema = mongoose.Schema({
  name: { type: String,
          required: true
  },
  email: { type: String,
           required: true,
           lowercase: true,
           unique: true
  },
  zipCode: { type: Number,
             min: [10000, "Zip code too short"],
             max: 99999
  }
});

// add Mongsoose models, but make them available
module.exports = mongoose.model('Subscriber', subscriberSchema);