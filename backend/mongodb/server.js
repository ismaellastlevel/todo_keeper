const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
// app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


const ListRouter = require('./routes/listRouter').Router;
const TaskRouter = require('./routes/taskRouter').Router;




mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
).then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });
mongoose.connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use('/lists', ListRouter);
app.use('/tasks', TaskRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('connected successfully to port : '+port);
});