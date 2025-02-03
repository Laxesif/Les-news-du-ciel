document.addEventListener('DOMContentLoaded', function () {
    const eventLinks = document.querySelector('.event-links'); // Le sous-menu des événements
    const eventButtons = document.querySelectorAll('nav a'); // Tous les boutons de navigation

    // Fonction pour masquer tous les sous-menus
    function hideAllSubMenus() {
        document.querySelectorAll('.event-links').forEach(function (subMenu) {
            subMenu.style.display = 'none';
        });
        // Retirer la classe 'active' de tous les boutons
        eventButtons.forEach(function (button) {
            button.classList.remove('active');
        });
    }

    // Gestion du clic sur le bouton "Événements"
    document.getElementById('eventsButton').addEventListener('click', function (e) {
        e.preventDefault(); // Empêche le comportement par défaut du lien
        // Si le sous-menu est déjà ouvert, le fermer
        if (eventLinks.style.display === 'flex') {
            hideAllSubMenus();
        } else {
            hideAllSubMenus(); // Fermer tous les sous-menus
            eventLinks.style.display = 'flex'; // Afficher le sous-menu des événements
            this.classList.add('active'); // Ajouter la classe 'active' au bouton
        }
    });

    // Fermer les sous-menus si l'utilisateur clique à l'extérieur
    document.addEventListener('click', function (e) {
        if (!e.target.closest('nav')) {
            hideAllSubMenus(); // Fermer tous les sous-menus
        }
    });
});

// Sélection du bouton
const scrollToTopButton = document.getElementById('scrollToTop');

// Affiche le bouton lorsque l'utilisateur descend
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) { // Affiche le bouton après 200px de scroll
        scrollToTopButton.style.display = 'flex';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

// Ajoute l'effet de remontée
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

        // Fonction pour détecter la connexion
        function checkConnection() {
            if (navigator.onLine) {

                document.getElementById("offlineMessage").style.display = "none";
                displayUTC();
            } else {
                document.getElementById("offlineMessage").style.display = "block";
                document.getElementById("utcTime").style.display = "none";
                document.getElementById("off").style.display = "none";

            }
        }
        checkConnection();

// Vérification à chaque changement de connexion
window.addEventListener("online", checkConnection);
window.addEventListener("offline", checkConnection);

        // Fonction pour afficher l'heure UTC sans les millisecondes et "Z"
        function displayUTC() {
            const currentDate = new Date();

            // Récupérer les composants de la date
            const year = currentDate.getUTCFullYear();
            const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Le mois commence à 0
            const day = currentDate.getUTCDate().toString().padStart(2, '0');
            const hours = currentDate.getUTCHours().toString().padStart(2, '0');
            const minutes = currentDate.getUTCMinutes().toString().padStart(2, '0');
            const seconds = currentDate.getUTCSeconds().toString().padStart(2, '0');

            // Construire la chaîne de date et heure sans les millisecondes et "Z"
            const utcTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

            // Afficher l'heure UTC
            document.getElementById('utcTime').textContent = 'Heure UTC actuelle : ' + utcTime;
        }

        // Appeler la fonction pour afficher l'heure UTC dès que la page se charge
        displayUTC();

        // Optionnel : mettre à jour l'heure UTC toutes les secondes
        setInterval(displayUTC, 1000);

        const apiUrl = 'https://launchlibrary.net/1/1/launch?next=5'; // Limite à 5 prochains lancements

// Fonction pour récupérer et afficher les lancements

