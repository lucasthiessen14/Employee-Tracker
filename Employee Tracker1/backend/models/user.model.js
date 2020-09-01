const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//creating the user model
//It is used to track the employee names
const userSchema = new Schema({

  //declaring usernames data type and requirment information
  username: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      minlength: 3
  },  
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

//exporting the users model so it can be accessed in the other files
module.exports = User;