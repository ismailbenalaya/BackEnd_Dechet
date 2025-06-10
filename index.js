require('dotenv').config({ path: "./config/.env" }); // Charger les variables d'env en premier

const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connexion à la base de données
require('./dbConfig/dbConfig');

// Importation des routes
const routerUser = require("./route/userRoute");
const routerAuth = require("./route/authRoute");
const routerRole = require("./route/roleRoute");
const routerCategorie = require("./route/categorieRoute");
const routerDechet = require("./route/dechetRoute");
const routerPvDechet = require("./route/pvDechetRoute");
const routerAdmin = require('./route/adminRoute');
const routerAuthAdmin = require('./route/authAdminRoute');

// Définition des routes
app.use("/categorie", routerCategorie);
app.use("/user", routerUser);
app.use("/auth", routerAuth);
app.use("/role", routerRole);
app.use("/dechet", routerDechet);
app.use("/pvDechet", routerPvDechet);
app.use("/admin", routerAdmin);
app.use("/auth/admin", routerAuthAdmin);

// Route de base
app.get('/', (req, res) => {
  res.send('Hello, Node.js!');
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
