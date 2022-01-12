const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//creating the positions model
const positionSchema = new Schema({

  //creating the different aspects associated with position and assigning their data type
  username: { type: String, required: true },
  job_description: { type: String, required: true },
  wage: { type: Number, required: true },
  start_date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Position = mongoose.model('Position', positionSchema);

//exporting the positions module to be used in other files
module.exports = Position;