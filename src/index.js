const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// Routes API
const authRoutes = require("./routes/authRoute.js");
const messagesRoute = require("./routes/messagesRoute.js");

const app = express();

// Middleware
app.use(cors()); // autorise le frontend à communiquer
app.use(express.json());

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoute);

// Route test
app.get("/", (req, res) => {
  res.send("API du chat en temps réel");
});

// Création du serveur HTTP pour Socket.IO
const server = http.createServer(app);

// Initialisation de Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // à restreindre plus tard au frontend React
    methods: ["GET", "POST"],
  },
});

// Gestion des connexions Socket.IO
io.on("connection", (socket) => {
  console.log("Nouvel utilisateur connecté :", socket.id);

  
  // Quand un utilisateur envoie un message
  socket.on("sendMessage", (data) => {
    console.log("Message reçu :", data);

    // Diffuse le message à tous les clients connectés
    io.emit("receiveMessage", data);
  });

  // Déconnexion
  socket.on("disconnect", () => {
    console.log("Utilisateur déconnecté :", socket.id);
  });
});

// Lancement du serveur
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Serveur backend lancé sur http://localhost:${PORT}`);
});

module.exports = app;
