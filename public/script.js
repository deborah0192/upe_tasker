// PHASE 1 : SÉLECTION DES COMPOSANTS STRATÉGIQUES DANS L'ARBRE MEMOIRE 
 
// Obtention d'une référence stable vers l'objet formulaire pour écouter sa soumission 
    const formulaireTaches = document.getElementById('task-form'); 
 
// Obtention du champ de saisie textuelle pour extraire la valeur entrée par l'étudiant 
    const champSaisieTache = document.getElementById('task-input'); 
 
// Obtention du conteneur parent global de type liste non ordonnée où injecter les lignes 
    const conteneurListeTaches = document.getElementById('task-list'); 
 

// PHASE 2 : BRANCHEMENT DU COMPORTEMENT APPLICATIF VIA L'ÉCOUTEUR D'ÉVÉNEMENT 
 
    formulaireTaches.addEventListener('submit', function(evenementCapture) { 
 
// ÉTAPE DE SÉCURITÉ CRUCIALE : Annulation du rechargement automatique de la page 

    evenementCapture.preventDefault();

// Extraction de la chaîne textuelle saisie au sein du champ input 
// La méthode .trim() supprime les espaces vides parasites au début et à la fin de la saisie 

    const intituleTacheNettoye = champSaisieTache.value.trim(); 
// CONTROLE DE VALIDITÉ : Éviter l'injection d'une ligne vide ou constituée uniquement d'espaces 
    if (intituleTacheNettoye === "") { 
        alert("Erreur de saisie : L'intitulé de la tâche universitaire ne peut être vide."); return; // Interruption immédiate du fil d'exécution de la fonction 
} 

// PHASE 3 : CRÉATION ALGORITHMIQUE ET PARMÉTRAGE DE LA NOUVELLE ENTITÉ 
// Instanciation "hors-sol" en mémoire vive d'un tout nouveau nœud d'élément de liste HTML 
    const nouvelElementLi = document.createElement('li'); 

// Affectation sécurisée du texte nettoyé à l'aide de la propriété textContent 
// On évite INNERHTML pour se prémunir nativement contre les failles d'injection XSS 
    nouvelElementLi.textContent = intituleTacheNettoye; 

// Ajout d'une classe CSS de présentation pour hériter automatiquement des styles du Chapitre 1 
    nouvelElementLi.classList.add('task-item'); 

// PHASE 4 : INJECTION PHYSIQUE AU SEIN DE L'INTERFACE GRAPHIQUE 
// Rattachement du nœud li orphelin à la fin de la liste des enfants 
    conteneurListeTaches.appendChild(nouvelElementLi); 

// PHASE 5 : OPTIMISATION DE L'EXPÉRIENCE UTILISATEUR (UX) 
// Vidage complet du champ textuel pour permettre une saisie ultérieure rapide 
    champSaisieTache.value = ""; 

// Repositionnement automatique du curseur de focus sur le champ de saisie 
    champSaisieTache.focus(); 
}); 