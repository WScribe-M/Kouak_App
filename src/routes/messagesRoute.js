const express = require('express');
const messageController = require('../controllers/messagesController.js');

const router = express.Router();

router.post('/send', messageController.sendMessage);
router.get('/', messageController.getMessages);
router.get('/user/:id_utilisateur', messageController.getMessagesByUser);

module.exports = router;