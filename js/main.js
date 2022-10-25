// /*=============== SHOW MENU ===============*/

// const navMenu = document.getElementById("nav-menu");
// const navToggle = document.getElementById("nav-toggle");
// const navClose = document.getElementById("nav-close");

// if (navToggle) {
//   navToggle.addEventListener("click", () => {
//     navMenu.classList.add("show-menu");
//   });
// }

// if (navClose) {
//   navClose.addEventListener("click", () => {
//     navMenu.classList.remove("show-menu");
//   });
// }

// /*=============== REMOVE MENU MOBILE ===============*/

// const navLink = document.querySelectorAll(".nav__link");

// function linkAction() {
//   const navMenu = document.getElementById("nav-menu");
//   navMenu.classList.remove("show-menu");
// }

// navLink.forEach((n) => n.addEventListener("click", linkAction));

// /*=============== CHANGE BACKGROUND HEADER ===============*/

// function scrollHeader() {
//   const header = document.getElementById("header");
//   const headerWidth = window.innerWidth;

//   if (this.scrollY >= 20 && headerWidth < 960)
//     header.classList.add("scroll-header");
//   else header.classList.remove("scroll-header");
// }

// window.addEventListener("scroll", scrollHeader);

// ############ Menü Animation ###############

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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

console.log(choices);

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

function insertAfter(message, field) {
  field.parentNode.insertBefore(message, field.nextSibling);
}

function createErrMsg(id, name) {
  let errMsg = document.createElement("p");
  errMsg.classList.add("error-message");
  errMsg.innerText = name + " ist fehlerhaft ausgefüllt.";

  let errField = document.getElementById(id);

  insertAfter(errMsg, errField);
  errField.focus();
}

const callbackOption = document.getElementById("callbackOption");
const callbacks = document
  .querySelectorAll("input[name='callback']")
  .forEach((callback) => {
    callback.addEventListener("change", function () {
      if (callback.checked) {
        // const callback = callback.id;
      }
      callbackOption.classList.toggle("v-hidden");
    });
  });

document.getElementById("formular").addEventListener("submit", (e) => {
  e.preventDefault();

  const person = document.getElementById("person").value;
  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;
  const nachricht = document.getElementById("nachricht").value;
  const telefon = document.getElementById("telefon").value;
  const termin = document.getElementById("termin").value;

  // console.log(callbacks);
  // console.log(person);
  // console.log(name);
  // console.log(nachricht);
  // console.log(termin);
  // console.log(person);
  // console.log(choiceNames); ####################################################################

  const nameCheck = /^[a-zA-Z\s\.\-\_äöüß]{2,}$/i;
  const nachrichtCheck = /^[0-9]{5}$/;
  const telfonCheck = /^[/+\-\s0-9]{3,20}$/g;
  const emailCheck =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!nameCheck.test(name)) {
    createErrMsg("name", "Vollständiger Name");
  }

  function toggleCallback() {}
});
