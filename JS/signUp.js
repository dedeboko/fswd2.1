// Récupérer le formulaire et les éléments du DOM
const signupForm = document.getElementById('signupForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm_password');
const errorMessageDiv = document.getElementById('error-message');

// Fonction pour valider l'email
function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

// Fonction pour valider le formulaire
function validateForm() {
  // Réinitialiser le message d'erreur
  errorMessageDiv.textContent = '';
  
  // Vérifier si tous les champs sont remplis
  if (!usernameInput.value || !emailInput.value || !passwordInput.value || !confirmPasswordInput.value) {
    errorMessageDiv.textContent = 'Tous les champs sont requis.';
    return false;
  }

  // Vérifier si l'email est valide
  if (!validateEmail(emailInput.value)) {
    errorMessageDiv.textContent = 'Veuillez entrer un email valide.';
    return false;
  }

  // Vérifier si les mots de passe correspondent
  if (passwordInput.value !== confirmPasswordInput.value) {
    errorMessageDiv.textContent = 'Les mots de passe ne correspondent pas.';
    return false;
  }

  // Si tout est valide, enregistrer les données dans le localStorage
  const user = {
    username: usernameInput.value,
    email: emailInput.value,
    password: passwordInput.value, // Ne pas stocker le mot de passe en texte clair en production
  };
  localStorage.setItem('user', JSON.stringify(user)); // Enregistrer l'utilisateur dans le localStorage

  return true;
}

// Ajouter l'événement de soumission du formulaire
signupForm.addEventListener('submit', function(event) {
  // Empêcher l'envoi du formulaire par défaut
  event.preventDefault();

  // Valider le formulaire
  if (validateForm()) {
    // Rediriger vers la page de connexion après validation réussie
    console.log("Validation réussie, redirection...");
    window.location.href = 'LogIn.html'; // Remplacer par le bon chemin si nécessaire
  }
});
