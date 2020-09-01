//loads the required models into the file to be used
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//create express server
const app = express();
const port = process.env.PORT || 5000;

//used to parse json
app.use(cors());
app.use(express.json());

//starts the connection to our MongoDB database
//ATLAS_URI must be set to your uri from your database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true}
    );

    
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

//connects the users and poitoins to the database
const positionsRouter = require('./routes/positions');
const usersRouter = require('./routes/users');

//connects the users and poitions models with the database
app.use('/positions', positionsRouter);
app.use('/users', usersRouter);

//starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});