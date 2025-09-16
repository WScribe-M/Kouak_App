const { Utilisateur } = require('../models');
const { Message } = require('../models');

exports.sendMessage = async (req, res) => {
  const { contenu, id_utilisateur } = req.body;
    try {
    const user = await Utilisateur.findByPk(id_utilisateur);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const message = await Message.create({ contenu, id_utilisateur });
    return res.status(201).json(message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({ include: [{ model: Utilisateur, as: 'Utilisateur', attributes: ['id', 'nom_utilisateur'] }] });
    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getMessagesByUser = async (req, res) => {
  const { id_utilisateur } = req.params;
  try {
    const messages = await Message.findAll({
      where: { id_utilisateur },
      include: [{ model: Utilisateur, as: 'Utilisateur', attributes: ['id', 'nom_utilisateur'] }]
    });
    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

