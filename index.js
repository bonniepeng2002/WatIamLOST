const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//import routes
const authRoute = require('./helpers/auth');


dotenv.config();

//connection
mongoose.connect(process.env.DB_CONNECT,
    () => console.log('connected to db!'));

//middleware
app.use(express.json());

app.use('/api/user', authRoute);

app.listen(3000, () => console.log("Server up and running"));