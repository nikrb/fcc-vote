const mongoose = require( 'mongoose');

const PollSchema = new mongoose.Schema({
  name: {
    type: String,
    index: { unique: true}
  },
  owner: {
    type: String
  },
  options: {
    type: [{ text: String, votes: [String]}]
  },
  created: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Poll', PollSchema);
