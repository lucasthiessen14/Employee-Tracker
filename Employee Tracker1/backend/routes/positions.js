//importing positions and setting its name
const router = require('express').Router();
let Position = require('../models/position.model');

//creating an add tag so new positoins can be created
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const job_description = req.body.job_description;
  const wage = Number(req.body.wage);
  const start_date = Date.parse(req.body.start_date);

  //creating the new position
    const newPosition = new Position({
    username,
    job_description,
    wage,
    start_date,
  });

  //saving the new position
  newPosition.save()
  .then(() => res.json('Position added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

//adding a tag so we can find access the saved data
router.route('/').get((req, res) => {
  Position.find()
    .then(positions => res.json(positions))
    .catch(err => res.status(400).json('Error: ' + err));
});

//accessing the saved data thorugh its unique id
router.route('/:id').get((req, res) => {
  Position.findById(req.params.id)
    .then(position => res.json(position))
    .catch(err => res.status(400).json('Error: ' + err));
});

//used to delete a position using its unique id
router.route('/:id').delete((req, res) => {
  Position.findByIdAndDelete(req.params.id)
    .then(() => res.json('Position deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//used to make a position updatable after it is created 
router.route('/update/:id').post((req, res) => {
  Position.findById(req.params.id)
    .then(position => {
      position.username = req.body.username;
      position.job_description = req.body.job_description;
      position.wage = Number(req.body.wage);
      position.start_date = Date.parse(req.body.start_date);

      position.save()
        .then(() => res.json('Position updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;