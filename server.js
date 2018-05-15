const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const users = require('./routes/api/user.js');

//Connect to DB
const db = keys.mongoURI;
mongoose.connect(db)
  .then(() => console.log('Connected to Mongo DB'))
  .catch(err => console.log(err));


// Body Parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


// App running notification
app.get('/', (req, res) => res.send(`MEAN app running on port ${port}`));


// Create routes
app.use('/api/users', users)

const port = 5000;
app.listen(port, () => console.log(`MEAN app running on port ${port}`))