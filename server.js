const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const compression = require('compression');
const path = require('path');

const formroutes = require('./routes/formRoutes.js');
const authroutes = require('./routes/authRoutes.js');

const mongoose = require('./config/db.js');

app.use(compression());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/form', formroutes);
app.use('/auth', authroutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(process.env.port);