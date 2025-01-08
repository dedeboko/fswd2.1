// Tableau des jeux avec noms associés
const games = [ 
    { image: "/picture/pacman.png", name: "pacman", type: "adventure", link: "/Pac-Man/Pac-Man.html" },
    { image: "/picture/crossmath.jpg", name: "Cross Math", type: "strategy", link:"/CrossMath/Game.html"},
    { image: "/picture/hero.png", name: "Hero", type: "adventure" },
    { image: "/picture/supermariobroswonder.png", name: "Super Mario Bros", type: "adventure" },
    { image: "/picture/top-jeux-video.png", name: "Top Jeux Video", type: "adventure" },
    { image: "/picture/castle-craft.png", name: "Castle Craft", type: "strategy" },
    { image: "/picture/Warzone-2.0.jpg", name: "Call Of Duty Warzone 2.0", type: "action" },
    { image: "/picture/BO6.png", name: "Call Of Duty Black Ops 6", type: "action" },
    { image: "/picture/fifa25.png", name: "FIFA 25", type: "sport" },
    { image: "/picture/fifa24.png", name: "FIFA 24", type: "sport" },
    { image: "/picture/fifa23.png", name: "FIFA 23", type: "sport" },
    { image: "/picture/fifa22.png", name: "FIFA 22", type: "sport" },
    { image: "/picture/forzahorizon4.png", name: "Forza Horizon 4", type: "racing" },
    { image: "/picture/forzahorizon5.png", name: "Forza Motorsport 5", type: "racing" },
];

// Sélectionne la grille des jeux et le champ de recherche
const gamesGrid = document.getElementById("gamesGrid");
const searchInput = document.getElementById("searchInput");

// Fonction pour afficher les jeux
function displayGames(filteredGames) {
    gamesGrid.innerHTML = ""; // Efface les jeux affichés précédemment

    filteredGames.forEach(game => {
        const gameItem = document.createElement("div");
        gameItem.classList.add("game-item");
        gameItem.dataset.type = game.type; // Ajoute le type comme attribut data-type

        // Crée un lien autour de l'image
        const gameLink = document.createElement("a");
        gameLink.href = game.link || "#"; // Lien vers la page du jeu ou inactif par défaut
        gameLink.style.display = "inline-block"; // Empêche les styles de perturber l'image

        const gameImage = document.createElement("img");
        gameImage.src = game.image;
        gameImage.alt = game.name;

        const gameName = document.createElement("h4");
        gameName.textContent = game.name;

        gameLink.appendChild(gameImage); // Ajoute l'image au lien
        gameItem.appendChild(gameLink); // Ajoute le lien dans l'élément
        gameItem.appendChild(gameName); // Ajoute le nom sous l'image
        gamesGrid.appendChild(gameItem); // Ajoute l'élément dans la grille
    });

    // Message si aucun jeu trouvé
    if (filteredGames.length === 0) {
        gamesGrid.innerHTML = "<p>No games found.</p>";
    }
}

// Fonction pour filtrer les jeux par type
function filterGames(type) {
    const filteredGames = type === "all" 
        ? games 
        : games.filter(game => game.type === type);
    displayGames(filteredGames);
}

// Fonction pour rechercher les jeux par nom
function searchGames(searchTerm) {
    const filteredGames = games.filter(game => 
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayGames(filteredGames);
}

// Ajouter un événement pour la recherche
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim(); // Texte saisi par l'utilisateur
    searchGames(searchTerm); // Recherche et mise à jour des jeux affichés
});

// Charger les jeux à l'initialisation
document.addEventListener("DOMContentLoaded", () => {
    displayGames(games); // Affiche tous les jeux au chargement
});
