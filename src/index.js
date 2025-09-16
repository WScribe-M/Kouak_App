const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoute.js');
const messagesRoute = require('./routes/messagesRoute.js');

app.use(express.json());

app.get('/', (req, res) => res.send('API OK'));

app.use('/api/auth', authRoutes);
app.use('/api/messages', messagesRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
