require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const port = process.env.HTTP_PORT;
const app = express();
const router = require('./routes/route');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/images', express.static('images'))
app.use(morgan('dev'));     


app.use(router)

app.listen(port, () => console.log('listening on port', port));