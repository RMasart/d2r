document.getElementById('passwordForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    const validPassword = 'association';

    if (password === validPassword) {
        // Redirection vers chasse.html
        window.location.href = 'chasse.html';
    } else {
        // Affiche un message d'erreur
        errorMessage.textContent = 'Mot de passe incorrect. Veuillez réessayer.';
    }
});
