const express = require('express');
const authRoutes = require('./routes/authRoute.js');
const messagesRoute = require('./routes/messagesRoute.js');

const app = express();

app.use(express.json()); // pour lire le JSON
app.use('/api/auth', authRoutes);
app.use('/api/messages', messagesRoute);

module.exports = app;
