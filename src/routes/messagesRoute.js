const express = require('express');
const messageController = require('../controllers/messagesController.js');
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post('/send', authMiddleware, messageController.sendMessage);
router.get('/', authMiddleware, messageController.getMessages);
router.get('/user/:id_utilisateur', authMiddleware, messageController.getMessagesByUser);

module.exports = router;