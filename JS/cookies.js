document.addEventListener("DOMContentLoaded", () => {
    const cookieModal = document.getElementById("cookie-consent-modal");
    const acceptButton = document.getElementById("accept-cookies");
    const rejectButton = document.getElementById("reject-cookies");
    const logoutButton = document.querySelector(".logout"); // Bouton Logout

    // Vérifier si le consentement a été donné dans la même session
    if (!localStorage.getItem("cookieConsent")) {
        // Afficher le modal après 1 seconde si le consentement n'a pas été donné
        setTimeout(() => {
            cookieModal.style.display = "flex";
        }, 1000);
    }

    // Gérer l'acceptation des cookies
    acceptButton.addEventListener("click", () => {
        localStorage.setItem("cookieConsent", "accepted");
        hideCookieModal();
    });

    // Gérer le rejet des cookies
    rejectButton.addEventListener("click", () => {
        localStorage.setItem("cookieConsent", "rejected");
        hideCookieModal();
    });

    // Gérer la déconnexion
    logoutButton.addEventListener("click", () => {
        // Supprimer le consentement de localStorage lors de la déconnexion
        localStorage.removeItem("cookieConsent");
    });

    // Fonction pour cacher le modal
    function hideCookieModal() {
        cookieModal.style.display = "none";
    }
});