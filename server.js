const express = require('express');
const path    = require('path');
const bodyParser = require('body-parser');
const cors    = require('cors');
const bb     = require('express-busboy');

const mongoose = require('mongoose');
const config  = require('./config/database');

mongoose.connect(config.database, (err)=>{
    if(err)
        console.log(err);
    else
        console.log('DB connected successfully');
})

const app = express();
bb.extend(app);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const todoRoutes = require('./routes/todo');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

app.use('/api/todo', todoRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth',authRoutes);

const PORT = process.env.PORT || 8080;




app.listen(PORT, ()=>{
    console.log('WOW server is runninig at port: '+ PORT);
})
