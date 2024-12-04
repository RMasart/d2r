// Variables globales
let questions = []; // Questions selon le thème
let currentQuestionIndex = 0;
let score = 0;
let userName = "";
let selectedTheme = "";
let leaderboard = []; // Tableau pour le classement

// Références des éléments HTML
const startQuizButton = document.getElementById("start-quiz");
const userNameInput = document.getElementById("user-name");
const errorMessage = document.getElementById("error-message");
const welcomeSection = document.getElementById("welcome-section");
const rankingSection = document.getElementById("ranking-section");
const quizSection = document.getElementById("quiz-section");
const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers-container");
const themeButtons = document.querySelectorAll(".theme-button");
const returnHomeButton = document.getElementById("return-home");
const viewRankingButton = document.getElementById("view-ranking");

// Gestion des boutons de sélection de thème
themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        themeButtons.forEach((btn) => btn.classList.remove("selected"));
        button.classList.add("selected");
        selectedTheme = button.dataset.theme;
    });
});

// Initialisation des événements
function initializeEvents() {
    // Action du bouton "Démarrer le quiz"
    startQuizButton.addEventListener("click", () => {
        userName = userNameInput.value.trim();
        if (userName === "") {
            errorMessage.textContent = "Veuillez entrer votre nom.";
            errorMessage.classList.remove("hidden");
        } else if (selectedTheme === "") {
            errorMessage.textContent = "Veuillez sélectionner un thème.";
            errorMessage.classList.remove("hidden");
        } else {
            errorMessage.classList.add("hidden");
            startQuiz();
        }
    });

    // Action du bouton "Voir le classement"
    viewRankingButton.addEventListener("click", () => {
        welcomeSection.classList.add("hidden");
        rankingSection.classList.remove("hidden");
    });

    // Action du bouton "Retour à l'accueil"
    returnHomeButton.addEventListener("click", resetQuiz);
}

// Démarrage du quiz
function startQuiz() {
    // Charger les questions en fonction du thème
    if (selectedTheme === "theme1") {
        questions = [
            { question: "Depuis quelques jours, une personne m’insulte sur internet, qu’est-ce que je fais ?", image: "images/fake1", answers: ["Je réponds à ses provocations", "Je la supprime", "Je la signale et la bloque"], correct: 2 },
            { question: "Quelle est la méthode la plus sûre pour créer un mot de passe ?", answers: ["Utiliser son prénom et sa date de naissance", "Un mélange de lettres, chiffres, et caractères spéciaux", "Réutiliser un mot de passe pour plusieurs comptes."], correct: 1 },
            { question: "Est-ce que je peux tout partager sur les réseaux sociaux ?", answers: ["Vrai", "Faux"], correct: 1 },
            { question: "Pourquoi est-il important d’avoir un mot de passe difficile à deviner ?", answers: ["Pour que les autres ne puissent pas accéder à votre compte.", "Pour impressionner vos amis.", "Pour pouvoir le retrouver facilement."], correct: 0 },
            { question: "Ma petite sœur de 11 ans a installé TikTok, a-t-elle le droit ?", answers: ["Vrai", "Faux"], correct: 1 },
            { question: "Les réseaux sociaux n’ont aucun impact sur la santé mentale ?", answers: ["Vrai", "Faux"], correct: 1 },
            { question: "Est-ce une bonne idée de publier votre adresse ou votre numéro de téléphone sur les réseaux sociaux ?", answers: ["Oui, pour que vos amis puissent vous contacter.", "Non, car cela peut être dangereux.", "Oui, mais seulement pendant les vacances."], correct: 1 },
            { question: "Que faut-il faire si un inconnu vous envoie un lien étrange ?", answers: ["Cliquer dessus pour voir ce que c’est.", "Ne pas cliquer et supprimer le message.", "Partager le lien avec vos amis pour en savoir plus."], correct: 1 },
        ];
    } else if (selectedTheme === "theme2") {
        questions = [
            { question: "Quel est le premier réflexe à avoir en cas de cyberharcèlement ?", answers: ["Ignorer et supprimer les messages.", "Répondre agressivement.", "Signaler l’auteur et alerter une personne de confiance."], correct: 2 },
            { question: "Partager une vidéo embarrassante d’une autre personne sans son accord est-il autorisé ?", answers: ["vrai", "faux"], correct: 1 },
            { question: "D'après vous, combien de jeunes déclarent avoir été victimes de cyberharcèlement ?", answers: ["1 sur 10.", "1 sur 5.", "1 sur 2."], correct: 1 },
            { question: "Que signifie cyberharcèlement ?", answers: ["Dire des choses gentilles sur Internet.", "Embêter ou insulter quelqu’un de façon répétée en ligne.", "Publier une photo de soi-même."], correct: 1 },
            { question: "Que faut-il faire si quelqu’un vous insulte ou vous menace en ligne ?", answers: ["Bloquer la personne et signaler son compte.", "Répondre pour l’insulter à votre tour.", "Ignorer sans rien faire."], correct: 0 },
            { question: "Est-il acceptable de partager une photo embarrassante d’un ami sans son autorisation ?", answers: ["Oui, si c’est pour rire.", "Non, cela peut le blesser ou l’humilier.", "Oui, si vous êtes très proches."], correct: 1 },
            { question: "Que peut-on faire si on voit quelqu’un se faire harceler sur un réseau social ?", answers: ["L’ignorer et passer à autre chose.", "Signaler le harceleur et soutenir la personne victime.", "Partager la publication pour que tout le monde la voie."], correct: 1 },
            { question: "Est-ce que tout ce qu’on dit sur Internet peut être retrouvé plus tard ?", answers: ["Non, les messages disparaissent après quelques jours.", "Oui, les messages ou publications peuvent être enregistrés ou capturés.", "Non, les réseaux sociaux effacent tout automat-iquement."], correct: 1 },
        ];
    } else if (selectedTheme === "theme3") {
        questions = [
            { question: "Qu’est-ce qu’une fake news ?", answers: [" Une information humoristique.", " Une information fausse diffusée intentionnellement.", "Un article d’opinion."], correct: 1 },
            { question: "Comment peut-on vérifier qu’une information partagée sur les réseaux est vraie ?", answers: [" En la partageant pour voir les réactions.", "En consultant des sources fiables ou officielles", "En regardant si beaucoup de gens l’ont partagée."], correct: 1 },
            { question: "Pourquoi les fake news se propagent-elles si vite ?", answers: [" Parce qu’elles sont souvent choquantes ou surprenantes.", "Parce qu’elles sont toujours vérifiées avant d’être partagées.", " Parce que les gens préfèrent les informations vraies."], correct: 0 },
            { question: "Es ce que les fake news peuvent affecter la société ?", answers: ["Vrai", "Faux"], correct: 1 },
            { question: "RealNews or FakeNews", image: "images/fake1.png", answers: ["RealNews", "FakeNews"], correct: 1 },
        ]
    }
    currentQuestionIndex = 0;
    score = 0;
    welcomeSection.classList.add("hidden");
    rankingSection.classList.add("hidden");
    quizSection.classList.remove("hidden");
    displayQuestion();
}
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    // Nettoyer le conteneur avant d'ajouter une nouvelle question
    questionContainer.innerHTML = "";
    answersContainer.innerHTML = "";

    // Afficher la question
    questionContainer.textContent = currentQuestion.question;

    if (currentQuestion.image) {
        const img = document.createElement("img");
        img.src = currentQuestion.image;
        img.alt = "Image associée à la question";
        img.style.width = "100%";
        img.style.marginTop = "10px";

        img.onload = () => {
            questionContainer.appendChild(img); // Afficher l'image après son chargement
        };

        img.onerror = () => {
            console.error("Erreur lors du chargement de l'image :", currentQuestion.image);
        };
    }


    // Afficher les réponses
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", () => checkAnswer(index));
        answersContainer.appendChild(button);
    });
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;
    answersContainer.innerHTML = "";
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", () => checkAnswer(index));
        answersContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correct;

    // Nettoyer le conteneur avant d'afficher le message
    questionContainer.innerHTML = "";
    answersContainer.innerHTML = "";

    // Afficher le message temporaire
    const message = document.createElement("p");
    message.textContent = isCorrect
        ? "Bonne réponse ! 🎉"
        : `Mauvaise réponse 😞. La bonne réponse était : ${currentQuestion.answers[currentQuestion.correct]}`;
    message.style.color = isCorrect ? "green" : "red";
    questionContainer.appendChild(message);

    if (isCorrect) score++;

    setTimeout(() => {
        questionContainer.innerHTML = ""; // Nettoyer les anciens messages
        answersContainer.innerHTML = ""; // Nettoyer les anciens boutons
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion(); // Passer à la prochaine question
        } else {
            endQuiz(); // Fin du quiz
        }
    }, 2000);
}

function endQuiz() {
    // Nettoyer les conteneurs de la question et des réponses
    questionContainer.innerHTML = "";
    answersContainer.innerHTML = "";

    // Ajouter le score actuel au classement
    leaderboard.push({ name: userName, score });
    leaderboard.sort((a, b) => b.score - a.score); // Trier par score décroissant

    // Afficher la section du classement
    quizSection.classList.add("hidden");
    rankingSection.classList.remove("hidden");

    // Afficher les 3 premiers
    const top3Container = document.querySelector(".top-3");
    top3Container.innerHTML = leaderboard
        .slice(0, 3)
        .map(
            (entry, index) =>
                `<div class="row">
                    <span>${index === 0 ? "1er" : `${index + 1}ième`}</span>
                    <span>${entry.name} - ${entry.score} pt(s)</span>
                </div>`
        )
        .join("");

    // Afficher le reste des participants
    const rankingTable = document.querySelector(".ranking-table");
    rankingTable.innerHTML = leaderboard
        .slice(3)
        .map(
            (entry, index) =>
                `<div class="row">
                    <span>${index + 4}</span>
                    <span>${entry.name} - ${entry.score} pt(s)</span>
                </div>`
        )
        .join("");
}


function resetQuiz() {
    userName = "";
    score = 0;
    currentQuestionIndex = 0;

    // Réinitialiser le formulaire d'entrée
    document.getElementById("user-name").value = "";

    // Masquer les sections
    welcomeSection.classList.remove("hidden");
    rankingSection.classList.add("hidden");
    quizSection.classList.add("hidden");

    // Masquer l'erreur si elle est affichée
    errorMessage.classList.add("hidden");

    // Réinitialiser les thèmes
    themeButtons.forEach((button) => button.classList.remove("selected"));
    selectedTheme = "";
}

// Initialiser les événements au chargement de la page
initializeEvents();
