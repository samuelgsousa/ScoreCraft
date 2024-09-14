const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const reviewsSchema = new mongoose.Schema({
    review_id: { type: Number },
    id: { type: Number },
    user_id: { type: Number, required: true },
    game_id: { type: Number, required: true },
    played_data: { type: Date, default: Date.now, required: false },
    rating: { type: Number, required: true },
    review_text: { type: String, default: null, required: true },
});

// function getNextSequenceValue(sequenceName) {
//     var sequenceDocument = db.counters.findAndModify({
//       query: { _id: sequenceName },
//       update: { $inc: { sequence_value: 1 } },
//       new: true
//     });
//     return sequenceDocument.sequence_value;
//   }
  


module.exports = mongoose.model('Review', reviewsSchema);