
// INCLUSION DES MODULES VIA COMMONJS
const express = require('express');
const path = require('path');
// INITIALISATION DE L'APPLICATION ET CONFIGURATION DES PARAMÈTRES
const app = express();
const PORT_RESEAU = 3000;
// MISE EN PLACE DES MIDDLEWARES : Configuration de la distribution statique
app.use(express.static(path.join(__dirname, 'public')));
// EXTENSION : DÉCLARATION D'UNE ROUTE API TECHNIQUE DE CONTRÔLE DE SANTÉ
app.get('/api/status', (requestClient, responseServeur) => {
    responseServeur.json({
        status: "operational",
        serverTime: new Date().toISOString(),
        author: "Département Génie Logiciel - UPE",
        academicContext: {
            chapter: 2,
            topic: "Dynamisation Client et Logique Serveur Express"
        }
    });
});
// INITIATION ACTIVE DU PROCESSUS D'ÉCOUTE RESEAU
app.listen(PORT_RESEAU, () => {

    
    console.log(` -> Serveur HTTP démarré avec succès sur l'environnement local.`);
    console.log(` -> URL d'accès direct de l'application : http://localhost:${PORT_RESEAU}`);
    console.log(" -> Surveillance de code active via Nodemon : Rechargement opérationnel.");
    console.log(" -> Pour interrompre le processus serveur, faites l'action : CTRL + C");


});

// INCLUSION DES MODULES ET LOGICIELS VIA COMMONJS
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');


const app = express();
const PORT_RESEAU = 3000;
// CONFIGURATION DES MIDDLEWARES SYSTEME ET DE SECURITE
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Indispensable pour intercepter et décoderreq.body au format JSON
// ARCHITECTURE DE CONNEXION ASYNCHRONE VERS MONGO-DB
mongoose.connect('mongodb://localhost:27017/upe-tasker')
.then(() => console.log(" -> [INFRASTRUCTURE] Connexion établie avecsuccès à MongoDB (upe-tasker)."))
.catch(err => console.error(" -> [ERREUR CRITIQUE] Échec de connexionà la base de données :", err));
const SchemaTache = new mongoose.Schema({label: { type: String, required: true }
});
const Tache = mongoose.model('Tache', SchemaTache);

// ROUTE [READ] : RÉCUPÉRER L'INTÉGRALITÉ DES TÂCHES DEPUIS LA BASE DE
DONNÉES
app.get('/api/tasks', async (req, res) => {
try {
const listeTaches = await Tache.find();
res.json(listeTaches);
} catch (erreur) {
console.error("Échec lors de la lecture des tâches :", erreur);
res.status(500).json({ error: "Erreur interne lors de la lectureen base de données." });}});
// INITIALISATION DU PROCESSUS D'ÉCOUTE RESEAU (À maintenir en fin absoluede fichier)
app.listen(PORT_RESEAU, () => {
console.log(` -> [RUNNING] Serveur UPE-Tasker actif sur l'adresse :
http://localhost:${PORT_RESEAU}`);
});

// ROUTE [CREATE] : ENREGISTRER UNE NOUVELLE TÂCHE UNIVERSITAIRE EN BASE
app.post('/api/tasks', async (req, res) => {
try {
const nouveauLabel = req.body.label;
if (!nouveauLabel || nouveauLabel.trim() === "") {
return res.status(400).json({ error: "Le libellé de la tâcheest obligatoire et ne peut être vide." });
}const nouvelleTache = new Tache({
label: nouveauLabel.trim()
});
await nouvelleTache.save();
res.status(201).json(nouvelleTache);} catch (erreur) {console.error("Échec lors de l'insertion de la tâche :", erreur);res.status(500).json({ error: "Erreur interne lors del'enregistrement en base de données." });}
});

// ROUTE [UPDATE] : MODIFIER LE LIBELLÉ D'UNE TÂCHE SPÉCIFIQUE VIA SON ID
DYNAMIQUE
app.put('/api/tasks/:id', async (req, res) => {
try {
const idTache = req.params.id;
const nouvelIntitule = req.body.label;
if (!mongoose.Types.ObjectId.isValid(idTache)) {
return res.status(400).json({ error: "Le format de l'identifiant fourni est syntaxiquement invalide." });
}
if (!nouvelIntitule || nouvelIntitule.trim() === "") {
return res.status(400).json({ error: "Le nouveau libellé nepeut être vide." });
}
const tacheModifiee = await Tache.findByIdAndUpdate(
idTache,
{ label: nouvelIntitule.trim() },
{ new: true }
);
if (!tacheModifiee) {
return res.status(404).json({ error: "La tâche ciblée n'existepas ou a été supprimée." });
}
res.json(tacheModifiee);} catch (erreur) {
console.error("Échec lors de la modification du document :",
erreur);
res.status(500).json({ error: "Erreur interne lors du traitementde modification." });

}
});

// ROUTE [DELETE] : SUPPRESSION D'UN DOCUMENT VIA SON IDENTIFIANT
app.delete('/api/tasks/:id', async (req, res) => {
try {
const idTache = req.params.id;
if (!mongoose.Types.ObjectId.isValid(idTache)) {
return res.status(400).json({ error: "Le format de l'identifiant fourni est valide." });
}
const tacheSupprimee = await Tache.findByIdAndDelete(idTache);
if (!tacheSupprimee) {
return res.status(404).json({ error: "Impossible de supprimer : document introuvable." });
}
res.json({ message: "Le document a été définitivement purgé." });
} catch (erreur) {
console.error("Échec lors de la suppression du document :",
erreur);
res.status(500).json({ error: "Erreur interne lors de l'effacement physique." });
}
});