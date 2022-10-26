// ############ Menü Animation ###############

const navMenu = document.getElementById("navMenu");
const line1 = document.getElementById("line1");
const line3 = document.getElementById("line3");
const transform1 = line1.getAttribute("transform");
const transform3 = line3.getAttribute("transform");

navMenu.addEventListener("mouseenter", function (e) {
  e.preventDefault();
  line1.setAttribute("transform", getTranslateValue(transform1, -3));
  line3.setAttribute("transform", getTranslateValue(transform3, 3));
});
navMenu.addEventListener("focus", function (e) {
  e.preventDefault();
  line1.setAttribute("transform", getTranslateValue(transform1, -3));
  line3.setAttribute("transform", getTranslateValue(transform3, 3));
});
navMenu.addEventListener("mouseout", function (e) {
  e.preventDefault();
  line1.setAttribute("transform", transform1);
  line3.setAttribute("transform", transform3);
});
navMenu.addEventListener("focusout", function (e) {
  e.preventDefault();
  line1.setAttribute("transform", transform1);
  line3.setAttribute("transform", transform3);
});

const getTranslateValue = function (transform, number) {
  const substringVal = transform.substring(
    transform.indexOf(" ") + 1,
    transform.lastIndexOf(")")
  );

  const transformVal =
    Math.round((parseFloat(substringVal) + number) * 100) / 100;
  const transformString = transform.replace(substringVal, transformVal);

  return transformString;
};

// ############# Choices ###############

const choices = Array.from(document.querySelectorAll(".choice__card"));
let choiceNames = [];

const weiterBtn = document.getElementById("weiterBtn");
const formContainer = document.getElementById("formContainer");
const choiceContainer = document.getElementById("choiceContainer");

function goToContact() {
  if (!checkChoice()) {
    return;
  }
  choiceContainer.classList.add("hide");
  formContainer.classList.remove("hide");
}

choices.forEach((choice) => {
  choiceNames.push(choice.children[3].innerText);

  weiterBtn.addEventListener("mousedown", () => {
    if (choice.classList.contains("selected")) {
      goToContact();
      createChoiceInfo();
      setPersonInput();
    }
  });

  choice.addEventListener("click", function (e) {
    e.preventDefault();

    choice.classList.add("selected");

    const choiceData = getChoiceData(this);
    putToSession(choiceData);
  });

  choice.addEventListener("focus", function () {
    if (!choice.classList.contains("selected")) {
      choice.classList.add("selected");
    }
    if (!weiterBtn.classList.contains("active")) {
      weiterBtn.classList.add("active");
    }
    if (weiterBtn.disabled) {
      weiterBtn.disabled = false;
    }
  });

  choice.addEventListener("blur", function () {
    if (choice.classList.contains("selected")) {
      choice.classList.remove("selected");
    }
    if (weiterBtn.classList.contains("active")) {
      weiterBtn.classList.remove("active");
    }
    if (!weiterBtn.disabled) {
      weiterBtn.disabled = true;
    }
  });
});

function getChoiceData(choice) {
  const choiceName = choice.children[3].innerText;
  let choiceImgPath = "temp";
  let choiceAlt = "temp";
  const choiceID = choice.id;

  if (choice.children[2].children.length) {
    choiceImgPath = choice.children[2].children[0].attributes.src.value;
    choiceAlt = choice.children[2].children[0].alt;
  }

  const choiceObj = { choiceName, choiceImgPath, choiceAlt, choiceID };

  return choiceObj;
}

function putToSession(obj) {
  window.sessionStorage.setItem("choiceName", obj.choiceName);
  window.sessionStorage.setItem("choiceImgPath", obj.choiceImgPath);
  window.sessionStorage.setItem("choiceAlt", obj.choiceAlt);
  window.sessionStorage.setItem("choiceID", obj.choiceID);
}

function getChoice(item) {
  return window.sessionStorage.getItem(item);
}

function checkChoice() {
  const check1 = getChoice("choiceName");
  const check2 = getChoice("choiceImgPath");
  const check3 = getChoice("choiceAlt");
  const check4 = getChoice("choiceID");
  const activeElement = document.activeElement.id;

  if ((check1, check2, check3 && check4 === activeElement)) {
    return true;
  }
  return false;
}

function createChoiceInfo() {
  const formChoiceImage = document.getElementById("formChoiceImage");
  const formChoiceName = document.getElementById("formChoiceName");
  if (
    getChoice("choiceImagPath") !== "temp" &&
    getChoice("choiceAlt") !== "temp"
  ) {
    const createImage = document.createElement("img");
    createImage.setAttribute("alt", getChoice("choiceAlt"));
    createImage.setAttribute("src", getChoice("choiceImgPath"));
    formChoiceImage.appendChild(createImage);
  }

  formChoiceName.innerText = getChoice("choiceName");
}

function goBack() {
  const zurueckBtn = document.getElementById("zurueckBtn");
  zurueckBtn.addEventListener("click", function () {
    formContainer.classList.add("hide");
    choiceContainer.classList.remove("hide");
    if (formChoiceImage.firstChild) {
      formChoiceImage.removeChild(formChoiceImage.children[0]);
    }
    const lastSelected = document.getElementById(getChoice("choiceID"));
    lastSelected.focus();
  });
}

goBack();

function setPersonInput() {
  const personInput = document.getElementById("person");
  personInput.value = getChoice("choiceName");
}

// ################### Form Validation ###################

function escapeHtml(input) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function insertAfter(message, field) {
  field.parentNode.insertBefore(message, field.nextSibling);
}

function createErrMsg(id, msg) {
  let errMsg = document.createElement("p");
  errMsg.classList.add("error-message");
  errMsg.innerText = msg;

  let errField = document.getElementById(id);
  insertAfter(errMsg, errField);
  errField.focus();
}

function toggleCallbackOption() {
  const callbackOption = document.getElementById("callbackOption");

  document.querySelectorAll("input[name='callback']").forEach((item) => {
    item.addEventListener("change", function () {
      callbackOption.classList.toggle("v-hidden");
    });
  });
}

toggleCallbackOption();

function validateTermin(termin) {
  const terminCheck = /^([2]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;

  if (!terminCheck.test(termin)) {
    return false;
  }

  const date = new Date(termin);
  const dateNow = new Date();
  const terminTime = date.getTime();
  const currentTime = dateNow.getTime();

  if (typeof terminTime !== "number" || Number.isNaN(terminTime)) {
    return false;
  }

  if (terminTime < currentTime) {
    return false;
  }

  return date.toISOString().startsWith(termin);
}

function errorCheck() {
  const errorList = formContainer.querySelectorAll(".error-message");

  return !errorList.length;
}

function emptyInputs() {
  document.getElementById("termin").value;
  document.getElementById("termin").value;
  document.getElementById("termin").value;
  document.getElementById("termin").value;
  document.getElementById("termin").value;
}

function validateForm() {
  document.querySelectorAll(".error-message").forEach((err) => err.remove());

  const person = document.getElementById("person").value.trim();
  const email = document.getElementById("email").value.trim();
  const name = document.getElementById("name").value.trim();
  const nachricht = document.getElementById("nachricht").value.trim();
  const telefon = document.getElementById("telefon").value.trim();
  const termin = document.getElementById("termin").value.trim();
  let callback = "";

  document.querySelectorAll("input[name='callback']").forEach((item) => {
    if (item.checked) {
      callback = item.value;
    }
  });

  const nameCheck = /^[a-zA-Z\s\.\-\_äöüß]{2,}$/i;
  const telefonCheck = /^[/+\-\s0-9]{3,20}$/g;
  const emailCheck =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!choiceNames.includes(person)) {
    createErrMsg("formBtn", "Es ist ein Fehler. augetreten. Versuch's nochmal");
  }
  if (!email) {
    createErrMsg("email", "Dieses Feld darf nicht leer sein.");
  } else if (!emailCheck.test(email)) {
    createErrMsg("email", "Bitte gib eine gültige Email ein");
  }
  if (!name) {
    createErrMsg("name", "Dieses Feld darf nicht leer sein.");
  } else if (!nameCheck.test(name)) {
    createErrMsg("name", "Bitte gib deinen vollständiger Namen ein");
  }
  if (!nachricht) {
    createErrMsg("nachricht", "Dieses Feld darf nicht leer sein.");
  } else if (nachricht.length > 1000) {
    createErrMsg(
      "nachricht",
      "Dieses Feld darf nicht mehr als 1000 Zeichen haben."
    );
  }
  if (!callback) {
    createErrMsg("callbackChoices", "Bitte wählen Sie eine Option aus.");
  } else if (callback === "jup") {
    if (!telefonCheck.test(telefon)) {
      createErrMsg("telefon", "Bitte gib eine korrekte Telefonnummer ein.");
    }
    if (!validateTermin(termin)) {
      createErrMsg("termin", "Bitte gib ein korrektes Datum ein.");
    }
  }
}

document.getElementById("formular").addEventListener("submit", (e) => {
  validateForm();
  if (errorCheck()) {
    e.preventDefault();
    const formular = document.getElementById("formular");
    const preFormData = new FormData(formular);
    const formData = new URLSearchParams(preFormData);
    console.log([...formData]);

    fetch("form_mail.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        showformMessage(data.message, data.error);
      })
      .catch((err) => {
        console.log("Ein Fehler ist aufgetreten: " + err);
      });
  } else {
    e.preventDefault();
  }
});

const formMessage = document.getElementById("formMessage");
const formMessageText = document.getElementById("formMessageText");

function showformMessage(msg, err) {
  const messageColor = err ? "error" : "success";

  formMessageText.classList.add(messageColor);
  formMessage.classList.add("show");
  formMessageText.innerText = msg;
  formMessage.setAttribute("aria-hidden", "false");
}
