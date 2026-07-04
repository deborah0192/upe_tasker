/**
 * APPLICATION CLIENT « UPE-TASKER » - SCRIPT D'INTERACTION DOM
 * Université Privée de l'Estuaire - Module de Génie Logiciel
 */
// PHASE 1 : SÉLECTION DES COMPOSANTS DANS L'ARBRE MÉMOIRE
const formulaireTaches = document.getElementById('task-form');
const champSaisieTache = document.getElementById('task-input');
const conteneurListeTaches = document.getElementById('task-list');
// PHASE 2 : BRANCHEMENT DU COMPORTEMENT APPLICATIF VIA L'ÉCOUTEUR
formulaireTaches.addEventListener('submit', function(evenementCapture) {
    // ÉTAPE DE SÉCURITÉ CRUCIALE : Annulation du rechargement automatique de la page
    evenementCapture.preventDefault();
    // Extraction et nettoyage de la chaîne textuelle saisie (.trim())
    const intituleTacheNettoye = champSaisieTache.value.trim();
    // CONTRÔLE DE VALIDITÉ
    if (intituleTacheNettoye === "") {
        alert("Erreur de saisie : L'intitulé de la tâche universitaire ne peut être vide.");
        return; 
    }
    // PHASE 3 : CRÉATION ALGORITHMIQUE DE LA NOUVELLE ENTITÉ
    const nouvelElementLi = document.createElement('li');
    nouvelElementLi.textContent = intituleTacheNettoye; // Évite les failles XSS
    nouvelElementLi.classList.add('task-item');
    // PHASE 4 : INJECTION PHYSIQUE AU SEIN DE L'INTERFACE GRAPHIQUE
    conteneurListeTaches.appendChild(nouvelElementLi);
    // PHASE 5 : OPTIMISATION DE L'UX
    champSaisieTache.value = "";
    champSaisieTache.focus();
})

// ANCRAGE DES COMPOSANTS STRATÉGIQUES DU DOM
const formulaireTaches = document.getElementById('task-form');
const champSaisieTache = document.getElementById('task-input');
const conteneurListeTaches = document.getElementById('task-list');
// IMPLÉMENTATION DU CANAL DE LECTURE RÉSEAU (READ)
function chargerLesTachesAdaptive() {
fetch('/api/tasks')
.then(response => {
if (!response.ok) throw new Error("Erreur lors de larécupération des données.");return response.json();
})
.then(taches => {
conteneurListeTaches.innerHTML = "";
taches.forEach(tache => {
afficherUneTacheDansLeDOM(tache.label, tache._id);
});
})
.catch(erreur => console.error(" -> [CLIENT ERREUR] Impossible de    charger les tâches :", erreur));
}

// IMPLÉMENTATION DU CANAL DE CRÉATION ASYNCHRONE (CREATE)
function enregistrerTacheSurLeServeur(texteTache) {
const corpsRequete = JSON.stringify({ label: texteTache });
fetch('/api/tasks', {
method: 'POST',

headers: {
'Content-Type': 'application/json'
},
body: corpsRequete
})
.then(response => {
if (!response.ok) throw new Error("Le serveur a refusé la créationdu document.");return response.json();
})
.then(tacheEnregistree => {
afficherUneTacheDansLeDOM(tacheEnregistree.label,
tacheEnregistree._id);
})
.catch(erreur => console.error(" -> [CLIENT ERREUR] Échec del'enregistrement :", erreur));
}

// IMPLÉMENTATION DU CANAL DE MISE À JOUR CIBLÉE (UPDATE)
function modifierTexteTacheSurLeServeur(idTache, nouveauTexte,
elementTexte) {
const corpsRequete = JSON.stringify({ label: nouveauTexte });
fetch(`/api/tasks/${idTache}`, {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: corpsRequete
})
.then(response => {
if (!response.ok) throw new Error("Échec de la validation ou de la modification serveur.");
return response.json();
})
.then(tacheModifiee => {
elementTexte.textContent = tacheModifiee.label;
})
.catch(erreur => console.error(" -> [CLIENT ERREUR] Erreur lors de lamise à jour :", erreur));
}

// IMPLÉMENTATION DU CANAL DE SUPPRESSION LOGIQUE ET PHYSIQUE (DELETE)
function supprimerTacheSurLeServeur(idTache, elementHtmlAEffacer) {

fetch(`/api/tasks/${idTache}`, { method: 'DELETE' })
.then(response => {
if (!response.ok) throw new Error("Le serveur a refusé la suppression.");
return response.json();
})
.then(() => {
elementHtmlAEffacer.remove();
})
.catch(erreur => console.error(" -> [CLIENT ERREUR] Échec de la suppression :", erreur));
}
function afficherUneTacheDansLeDOM(texte, idTache) {
const nouvelElementLi = document.createElement('li');
nouvelElementLi.classList.add('task-item');
const zoneTexte = document.createElement('span');
zoneTexte.textContent = texte;
nouvelElementLi.appendChild(zoneTexte);
const conteneurActions = document.createElement('div');
const boutonModifier = document.createElement('button');
boutonModifier.textContent = "Mod";
boutonModifier.classList.add('edit-btn');
boutonModifier.addEventListener('click', () => {
if (nouvelElementLi.querySelector('input[type="text"]')) return;
const texteActuel = zoneTexte.textContent;
const champEdition = document.createElement('input');
champEdition.type = 'text';
champEdition.value = texteActuel;
nouvelElementLi.replaceChild(champEdition, zoneTexte);
champEdition.focus();
boutonModifier.textContent = "Enregistrer";
const sauvegarderChangements = () => {
const intituleModifie = champEdition.value.trim();
if (intituleModifie !== "") {
modifierTexteTacheSurLeServeur(idTache, intituleModifie,
zoneTexte);
}
nouvelElementLi.replaceChild(zoneTexte, champEdition);

boutonModifier.textContent = "Mod";
};
champEdition.addEventListener('keypress', (e) => {
if (e.key === 'Enter') sauvegarderChangements();
});
const actionUniqueSauvegarde = () => {
sauvegarderChangements();
boutonModifier.removeEventListener('click',
actionUniqueSauvegarde);
};
boutonModifier.addEventListener('click', actionUniqueSauvegarde,
{ once: true });
});
conteneurActions.appendChild(boutonModifier);
const boutonSupprimer = document.createElement('button');
boutonSupprimer.textContent = "Sup";
boutonSupprimer.classList.add('delete-btn');
boutonSupprimer.addEventListener('click', () => {
supprimerTacheSurLeServeur(idTache, nouvelElementLi);
});
conteneurActions.appendChild(boutonSupprimer);
nouvelElementLi.appendChild(conteneurActions);
conteneurListeTaches.appendChild(nouvelElementLi);
}
formulaireTaches.addEventListener('submit', function(e) {
e.preventDefault();
const intituleTacheNettoye = champSaisieTache.value.trim();
if (intituleTacheNettoye === "") {
alert("L'intitulé de la tâche ne peut être vide.");
return;
}
enregistrerTacheSurLeServeur(intituleTacheNettoye);
champSaisieTache.value = "";
champSaisieTache.focus();
});
chargerLesTachesAdaptive();