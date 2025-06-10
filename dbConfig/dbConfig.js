const mongoose = require ('mongoose');

// Connexion à la base de données MongoDB hébergée sur MongoDB Atlas
mongoose.connect('mongodb+srv://mohamed:hamaxD123456@cluster0.jware.mongodb.net/')
    .then(() => {
        console.log('Connexion à la base de données établie avec succès');
    })
    .catch((err) => {
        console.error('Erreur lors de la connexion à la base de données :', err);
    });


module.exports = mongoose;