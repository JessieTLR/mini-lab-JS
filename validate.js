const form = document.querySelector("form");

const inputs = document.querySelectorAll(
  'input[type="text"],input[type="password"]'
);

const progressBar = document.getElementById("progress-bar");

let pseudo, email, password, confirmPass;

const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

const pseudoChecker = (value) => {
  if ((value.length > 0 && value.length < 3) || value.length > 20) {
    errorDisplay("pseudo", "Le pseudo doit faire entre 3 et 20 caractères");
    pseudo = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "pseudo",
      "Le pseudo ne doit pas contenir de caractères spéciaux"
    );
    pseudo = null;
  } else {
    errorDisplay("pseudo", "", true);
    pseudo = value;
  }
};

const emailChecker = (value) => {
  if (!value.match(/^[\w-_]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "votre email est incorrect");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

const passwordChecker = (value) => {
  progressBar.classList = ""; // pour ne pas que les classes s'empilent
  if (
    !value.match(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\w]){1,})(?!.*\s).{8,}$/
    )
  ) {
    errorDisplay(
      "password",
      "Minimum 8 caractères, 1 majuscule, 1 minuscule et 1 caractère spécial"
    );
    progressBar.classList.add("progressRed");
    password = null;
  } else if (value.length < 12) {
    errorDisplay("password", "", true);
    progressBar.classList.add("progressBlue");
    password = value;
  } else {
    errorDisplay("password", "", true);
    progressBar.classList.add("progressGreen");
    password = value;
  }
  if (confirmPass) confirmChecker(confirmPass); // si quelque chose est écrit dans le confirmPass, alors tu peux vérifier le confirmChecker. Cette règle existe car sinon on pourrait modifier le MDP une fois que la confirmation est faite, l'ordinateur ne verrait pas le différence entre les deux mots.
};

const confirmChecker = (value) => {
  if (value !== password) {
    errorDisplay("confirm", "Les mots de passe ne sont pas identiques");
    confirmPass = false;
  } else {
    errorDisplay("confirm", "", true);
    confirmPass = true;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "pseudo":
        pseudoChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "password":
        passwordChecker(e.target.value);
        break;
      case "confirm":
        confirmChecker(e.target.value);
        break;
      default:
        nul;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (pseudo && email && password && confirmPass) {
    const data = {
      pseudo: pseudo,
      email: email,
      password: password,
    };
    console.log(data);

    inputs.forEach((input) => (input.value = "")); // vider chaque input après validation
    progressBar.classList.remove();

    pseudo = null;
    email = null;
    password = null;
    confirmPass = null;
    alert("Inscription validée !");
  } else {
    alert("Veuillez remplir les champs correctement");
  }
});
