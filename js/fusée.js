async function fetchLaunches() {
    const url = 'https://fdo.rocketlaunch.live/json/launches/next/5'; // API principale
    const backupUrl = 'https://launchlibrary.net/1/launch'; // Nouvelle API de secours

    try {
        // Récupère les lancements depuis l'API principale
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        displayLaunches(data.result);

        // Pour chaque lancement, vérifier si la date et le lieu sont manquants
        data.result.forEach(async (launch) => {
            if (!launch.net || !launch.location) {
                // Si la date ou le lieu est manquant, récupérer les informations depuis l'API de secours
                const backupResponse = await fetch(`${backupUrl}/${launch.id}`);
                if (backupResponse.ok) {
                    const backupData = await backupResponse.json();
                    // Mettre à jour les informations manquantes
                    if (!launch.net) launch.net = backupData.launches[0].net;  // Mettre la date de secours
                    if (!launch.location) launch.location = backupData.launches[0].location;  // Mettre le lieu de secours
                    displayLaunches(data.result);  // Rafraîchir l'affichage des lancements
                } else {
                    console.error('Erreur API de secours');
                }
            }
        });
    } catch (error) {
        console.error('Error fetching launches:', error);
        document.getElementById('launches').innerHTML = '<p>Erreur : Impossible de charger les lancements.</p>';
    }
}

function displayLaunches(launches) {
    const container = document.getElementById('launches');
    container.innerHTML = '';

    launches.forEach(launch => {
        const launchName = launch.name || "Mission inconnue";
        const rocketName = launch.vehicle ? launch.vehicle.name : "Fusée inconnue";
        const launchTime = launch.net ? new Date(launch.net).toLocaleString('fr-FR', { timeZone: 'UTC' }) : "Date inconnue"; // Date en UTC
        const launchId = launch.id || "ID inconnue";
        const cosparId = launch.cospar_id || "Pas de COSPAR ID";
        const location = launch.location ? launch.location.name : "Lieu inconnu";

        const div = document.createElement('div');
        div.className = 'launch';

        div.innerHTML = `
            <h2>${launchName}</h2>
            <p><strong>Fusée :</strong> ${rocketName}</p>
            <p><strong>Date de lancement (UTC) :</strong> ${launchTime}</p>
            <p><strong>Lieu :</strong> ${location}</p>
            <p><strong>ID :</strong> ${launchId}</p>
            <p><strong>COSPAR ID :</strong> ${cosparId}</p>
        `;

        container.appendChild(div);
    });
}

// Appelle la fonction pour récupérer les lancements dès le chargement de la page
fetchLaunches();

