document.addEventListener("DOMContentLoaded", () => {
  // Example user data (replace with real data)
  const userProfile = {
    username: "Gamer123",
    experiencePoints: 1200,
    memberSince: "January 2023",
    likedGames: 5,
    location: "New York, USA",
    friends: 12,
    games: [
      { name: "Game 1", level: "Level 10", playtime: "15 hours" },
      { name: "Game 2", level: "Level 5", playtime: "8 hours" },
      { name: "Game 3", level: "Level 2", playtime: "2 hours" },
    ],
    // On pourrait ajouter un champ bestScore, 
    // mais on va surtout lire localStorage:
    bestScore: 0 
  };

  // --- NOUVEAU CODE : lire bestScore depuis localStorage ---
  const savedBestScore = localStorage.getItem("bestScore");
  if (savedBestScore) {
    userProfile.bestScore = parseInt(savedBestScore, 10);
  }

  // Populate profile data
  document.getElementById("username").textContent = userProfile.username;
  document.getElementById("xp-points").textContent = userProfile.experiencePoints;
  document.getElementById("member-since").textContent = userProfile.memberSince;
  document.getElementById("liked-games-count").textContent = userProfile.likedGames;
  document.getElementById("location").textContent = userProfile.location;
  document.getElementById("friends-count").textContent = userProfile.friends;

  // --- NOUVEAU CODE : afficher le bestScore à l’écran ---
  document.getElementById("best-score").textContent = userProfile.bestScore;

  // Populate games list
  const gamesList = document.getElementById("games-list");
  userProfile.games.forEach(game => {
    const gameItem = document.createElement("div");
    gameItem.classList.add("game-item");
    gameItem.innerHTML = `
      <h4>${game.name}</h4>
      <p><strong>Level:</strong> ${game.level}</p>
      <p><strong>Playtime:</strong> ${game.playtime}</p>
    `;
    gamesList.appendChild(gameItem);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const uploadButton = document.getElementById("upload-button");
  const uploadInput = document.getElementById("upload-photo");
  const profilePhoto = document.getElementById("profile-photo");

  uploadButton.addEventListener("click", () => {
    uploadInput.click();
  });

  uploadInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        profilePhoto.src = e.target.result;

        // Optionally save the photo to localStorage
        localStorage.setItem("profilePhoto", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });

  // Load photo from localStorage if available
  const savedPhoto = localStorage.getItem("profilePhoto");
  if (savedPhoto) {
    profilePhoto.src = savedPhoto;
  }
});
