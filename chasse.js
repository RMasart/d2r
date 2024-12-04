// Liste des codes associés à chaque indice
const codes = {
    1: "solidarité",
    2: "Azad",
    3: "indice",
    4: "partage",
    5: "Gullivert",
    6: "stock",
    7: "cordonnier",
    8: "textile",
    9: "trouver",
    10: "chercher",
    11: "ordre",
    12: "rangement",
    13: "quiz",
    14: "Donner Rendre Recevoir"
};

// Messages à afficher pour chaque indice
const messages = {
    1: "Ma 10ieme lettre et la 19e lettre de l'alphabet || Le prochain indice est plus proche que vous le pensez",
    2: "La première lettre du prénom est votre réponse || Le prochaine indice et dans une autre pièce",
    3: "Livre - Licorne - Lapin - Lutin - Lisbonne || Dans la cour quelque chose y est déposé",
    4: "2 + 2 + 2 - 4 || La boutique et un endroit parfait pour un indice",
    5: "Je commence le mot été et je termine le mot automne, Sans moi l’éléphant ne serait pas vivant, Présente partout, parfois muette, je m’impose sans bruit || Une personne a perdu ses lunettes dans la réserve retrouver les",
    6: "Triste - Ministre - Lustre - Ventre - Centre || Un membre du personnel a acheter une paire de chaussure, un indice y est surement dissimuler",
    7: "5 + 2 + 8 - 2 + 5 || Un vêtement d'exception cache un immense secret, a toi de le découvrir, retrouvez le dans l’atelier",
    8: "N || Retourne moi",
    9: "<img src='math.png' alt='IndiceMath' /> || Quelqu'un a oublié sa veste dans la salle de stockage,tu devrais aller y jeter un œil",
    10: "France - Fille - Silence - File - Science || Des vêtements sont posés de manière hasardeuse allant du plus de point au moins de point, trouvé les et mettez les dans l’ordre",
    11: "Hibou - Lilou - Myrtille - Singe - Village || Des boules sont dissimulées dans un carton de vêtement retrouvé, elle y cache peut être un secret",
    12: "(8−3)+(6÷2)−1= ? ||",
    13: "On me trouve dans le mot fille mais pas garçon, Je me situe entre Haïti  et la Jamaïque, Je me tiens droite comme une aiguille. Qui suis-je ? || Un quiz et disimuler a coter de la caisse",
    14: "Je commence les nuits, Je navigue dans les noms, Sans moi, Noël n’aurait pas de nom. Qui suis-je ? || Remettez les lettres trouver dans le bon ordre afin de trouver le mot final",
};

// Fonction pour demander le code
function showCodePrompt(indice) {
    const userCode = prompt(`Entrez le code pour l'indice ${indice} :`);
    if (userCode === codes[indice]) {
        displayMessage(indice);
    } else {
        alert("Code incorrect. Réessayez !");
    }
}

// Fonction pour afficher le message de l'indice
function displayMessage(indice) {
    document.getElementById("indices").classList.add("hidden-content");
    document.getElementById("result").classList.add("visible");

    // Utilisez innerHTML pour insérer du contenu HTML (comme des balises <img>)
    document.getElementById("result-text").innerHTML = messages[indice];
}

// Fonction pour revenir à la liste des indices
function backToSelection() {
    document.getElementById("indices").classList.remove("hidden-content");
    document.getElementById("result").classList.remove("visible");
    document.getElementById("final-word").classList.remove("visible");
    document.getElementById("congratulations").classList.remove("visible");
}

// Le mot final à deviner
const finalWord = ["ALBERT", "EINSTEIN"]; // Deux mots séparés


function showFinalPrompt() {
    document.getElementById("indices").classList.add("hidden-content");
    document.getElementById("result").classList.add("hidden-content");
    document.getElementById("final-word").classList.add("visible");

    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = ""; // Réinitialiser le conteneur

    // Générer les champs pour chaque mot
    finalWord.forEach((word, wordIndex) => {
        for (let i = 0; i < word.length; i++) {
            const input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1;
            input.className = "letter-input";
            input.dataset.wordIndex = wordIndex; // Identifier à quel mot il appartient
            input.dataset.letterIndex = i; // Identifier la position de la lettre
            input.addEventListener("input", checkLetter);
            wordContainer.appendChild(input);
        }

        // Ajouter un séparateur visuel entre les mots
        if (wordIndex < finalWord.length - 1) {
            const separator = document.createElement("span");
            separator.textContent = "-";
            separator.className = "fixed-dash"; // Classe pour styliser le tiret
            wordContainer.appendChild(separator);
        }
    });
}


function checkLetter(event) {
    const input = event.target;
    const wordIndex = parseInt(input.dataset.wordIndex);
    const letterIndex = parseInt(input.dataset.letterIndex);
    const enteredLetter = input.value.toUpperCase();

    // Vérifier si la lettre est correcte
    if (enteredLetter === finalWord[wordIndex][letterIndex]) {
        input.classList.add("correct");
        input.classList.remove("incorrect");
    } else {
        input.classList.add("incorrect");
        input.classList.remove("correct");
    }

    // Passer au champ suivant si correct
    if (enteredLetter && input.classList.contains("correct")) {
        let nextInput = input.nextElementSibling;

        // Sauter les tirets automatiquement
        while (nextInput && nextInput.tagName === "SPAN") {
            nextInput = nextInput.nextElementSibling;
        }

        if (nextInput) {
            nextInput.focus();
        }
    }

    // Vérifier le mot entier après chaque entrée
    checkCompleteWord();
}


function checkCompleteWord() {
    const inputs = document.querySelectorAll(".letter-input");
    const userWords = [[], []]; // Stocke les lettres pour chaque mot

    // Construire chaque mot utilisateur
    inputs.forEach(input => {
        const wordIndex = parseInt(input.dataset.wordIndex);
        userWords[wordIndex].push(input.value.toUpperCase());
    });

    // Vérifie les deux mots séparément
    const isWord1Correct = userWords[0].join("") === finalWord[0];
    const isWord2Correct = userWords[1].join("") === finalWord[1];

    if (isWord1Correct && isWord2Correct) {
        showCongratulations(); // Afficher les félicitations si les deux mots sont corrects
    }
}


function showCongratulations() {
    // Cacher toutes les autres sections
    document.getElementById("final-word").classList.add("hidden-content");
    document.getElementById("indices").classList.add("hidden-content");
    document.getElementById("result").classList.add("hidden-content");

    // Afficher la section des félicitations
    document.getElementById("congratulations").classList.remove("hidden-content");
}


// Fonction pour afficher la page de félicitations
function showCongratulations() {
    document.getElementById("final-word").classList.add("hidden-content");
    document.getElementById("congratulations").classList.add("visible");
}
