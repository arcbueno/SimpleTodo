const express = require('express');
const mongoose = require('mongoose');
const {check} = require('express-validator');
require('dotenv').config();

// App
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// To-do Database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING_TODO, {
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true 
});

const db = mongoose.connection;
  
db.on('connected', () => {
    console.log('Mongoose To Do connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});

// Load models
const Todo = require('./models/todo');
const User = require('./models/user');

// Load routes
const indexRoutes = require('../routes/index-routes');
app.use('/', indexRoutes);

const todoRoutes = require('../routes/index-routes');
app.use('/todo', todoRoutes);

module.exports = app;