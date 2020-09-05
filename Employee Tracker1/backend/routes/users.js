//imports the user model and sets it equal to a variable
const router = require('express').Router();
let User = require('../models/user.model');

//creates a tag so new users can be added
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const address = req.body.address;
  const sin_number = req.body.sin_number;
  const birthday = Date.parse(req.body.birthday);

  const newUser = new User({
    username,
    address,
    sin_number,
    birthday
  });

  //saves the new user
  newUser.save()
    .then(() => res.json('Employee added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//used to find the users that we have saved
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//used to delete a user using its unique id
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('Position deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;