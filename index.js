// INCLUSION DES MODULES ET DÉPENDANCES LOGICIELLES VIA COMMONJS 
 // Chargement du framework Express 
    const express = require('express'); 
 
// Chargement du module natif Node.js 'path' permettant de manipuler de manière 
// sécurisée les arborescences et les chemins de fichiers du système d'exploitation 
    const path = require('path'); 
 
// INITIALISATION DE L'APPLICATION ET CONFIGURATION DES PARAMÈTRES SYSTEME 
// Instanciation de l'instance logicielle applicative Express 
    const app = express(); 

// Définition de la constante symbolisant le port réseau d'écoute logicielle 
    const PORT_RESEAU = 3000; 

// MISE EN PLACE DES MIDDLEWARES ET CONFIGURATION DE LA ZONE STATIQUE 
    app.use(express.static(path.join(  dirname, 'public'))); 

// EXTENSION : DÉCLARATION D'UNE ROUTE API TECHNIQUE DE CONTRÔLE DE SANTÉ 
// Création d'un point d'accès API de type GET pour valider l'état fonctionnel 
// du serveur et renvoyer une réponse structurée au format universel JSON. 
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

// INITIATION ACTIVE DU PROCESSUS D'ÉCOUTE SUR L'INTERFACE LOGICIELLE 
// Ordre au processus d'occuper le port 3000 et de rester à l'écoute des requêtes 
    app.listen(PORT_RESEAU, () => { 
 
        console.log("====================================================================="); 
        console.log(" UNIVERSITÉ PRIVÉE DE L'ESTUAIRE - INFRASTRUCTURE APPLICATIVE ALERTE"); 
 
        console.log("====================================================================="); 
        console.log(` -> Serveur HTTP démarré avec succès sur l'environnement local.`); 
        console.log(` -> URL d'accès direct de l'application : http:// localhost:${PORT_RESEAU}`); 
        console.log(" -> Surveillance de code active via Nodemon : Rechargement à chaud opérationnel."); 
        console.log(" -> Pour interrompre le processus serveur, faites l'action : CTRL + C"); 
 
        console.log("====================================================================="); 
}); 
