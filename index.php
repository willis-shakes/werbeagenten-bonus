<?php 

session_start();

if(!isset($_SESSION["token"])) {
	$_SESSION["token"] = bin2hex(openssl_random_pseudo_bytes(32));
}

?>


<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/style.css" />
    <link rel="shortcut icon" href="images/favicon.png" type="image/x-icon">
    <title>Werbeagenten Projekt</title>
</head>

<body>
    <!--==================== HEADER ====================-->
    <header class="header" id="header">
        <nav class="nav container container-full">
            <a id="navMenu" aria-label="Menü" class="nav__link" href="#">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30.352" height="24.99"
                    viewBox="0 0 30.352 24.99">
                    <g id="Gruppe_58" data-name="Gruppe 58" transform="translate(-133.775 -30.555) rotate(-8)">
                        <line id="line1" data-name="line1" x2="30" transform="translate(127.639 54.51)" fill="none"
                            stroke="#fff" stroke-width="3" />
                        <line id="line2" data-name="line2" x2="30" transform="translate(126.51 63.361)" fill="none"
                            stroke="#fff" stroke-width="3" />
                        <line id="line3" data-name="line3" x2="30" transform="translate(125.38 72.212)" fill="none"
                            stroke="#fff" stroke-width="3" />
                    </g>
                </svg>
                Menü
            </a>
            <a class="nav__link nav__login" href="#">
                <img src="images/login.svg" alt="Login-Icon" />
                Login
            </a>
        </nav>
    </header>
    <!--==================== MAIN ====================-->
    <main>
        <!--==================== Contact ====================-->
        <div class="section">
            <div class="contact">
                <button aria-label="Kontakt schließen" class="contact__close">
                    <img aria-hidden="true" height="20" width="20" src="images/close.svg"
                        alt="Schließt Kontaktformular" />
                </button>
                <div id="choiceContainer" class="choice">
                    <div class="choice__head">
                        <h1>Kontakt</h1>
                        <p>Wer soll sich bei dir melden?</p>
                    </div>
                    <ul class="choice__grid">
                        <li class="choice__grid-item">
                            <button id="choice1" class="choice__card">
                                <div aria-hidden="true" class="choice__card-check"></div>
                                <h3 class="choice__card-title">Allgemein</h3>
                                <div class="choice__card-image">
                                    <img height="100" width="100" src="images/person-1.jpg"
                                        alt="jan-peter oppenheimer" />
                                </div>
                                <h4 class="choice__card-person">Jan-Peter Oppenheimer</h4>
                                <small class="choice__card-job">Head of Digital</small>
                                <div class="choice__card-phone">
                                    <img src="images/phone.svg" alt="Telefon-Icon" />
                                    <span>+49 6221 123 456-78</span>
                                </div>
                            </button>
                        </li>
                        <li class="choice__grid-item">
                            <button id="choice2" class="choice__card">
                                <div aria-hidden="true" class="choice__card-check"></div>
                                <h3 class="choice__card-title">Buchung</h3>
                                <div class="choice__card-image">
                                    <img height="100" width="100" src="images/person-2.jpg" alt="romina parejo ramon" />
                                </div>
                                <h4 class="choice__card-person">Romina Parejo Ramón</h4>
                                <small class="choice__card-job">Consultant Digital</small>
                                <div class="choice__card-phone">
                                    <img src="images/phone.svg" alt="Telefon-Icon" />
                                    <span>+49 6221 123 456-78</span>
                                </div>
                            </button>
                        </li>
                        <li class="choice__grid-item">
                            <button id="choice3" class="choice__card">
                                <div aria-hidden="true" class="choice__card-check"></div>
                                <h3 class="choice__card-title">Studios</h3>
                                <div class="choice__card-image">
                                    <img height="100" width="100" src="images/person-3.jpg" alt="jan koch" />
                                </div>
                                <h4 class="choice__card-person">Jan Koch</h4>
                                <small class="choice__card-job">Senior Expert Events</small>
                                <div class="choice__card-phone">
                                    <img src="images/phone.svg" alt="Telefon-Icon" />
                                    <span>+49 6221 123 456-78</span>
                                </div>
                            </button>
                        </li>
                        <li class="choice__grid-item">
                            <button id="choice4" class="choice__card">
                                <div aria-hidden="true" class="choice__card-check"></div>
                                <h3 class="choice__card-title">Egal</h3>
                                <div class="choice__card-image"></div>
                                <h4 class="choice__card-person">Offene Anfrage</h4>
                                <small class="choice__card-job">Allgemeine Infos</small>
                                <div class="choice__card-phone">
                                    <img src="images/phone.svg" alt="Telefon-Icon" />
                                    <span>+49 6221 123 456-78</span>
                                </div>
                            </button>
                        </li>
                    </ul>
                    <button type="button" disabled="disabled" id="weiterBtn" class="choice__btn">
                        Weiter
                    </button>
                </div>
                <!--=============== Form ===============-->
                <div id="formContainer" class="form__container hide">
                    <div class="form">
                        <div class="form__head">
                            <button id="zurueckBtn">
                                <img src="images/back.svg" alt="Zurück zur Auswahl" /> zurück
                            </button>
                            <h2>Kontakt</h2>

                            <div class="form__choice">
                                <div id="formChoiceImage" class="form__choice-image"></div>
                                <h3 id="formChoiceName">Romina Parejo Ramon</h3>
                            </div>
                        </div>

                        <form method="post" id="formular" action="">
                            <div class="form__col">
                                <fieldset class="infos">
                                    <legend>
                                        Du hast Fragen oder willst einen Termin ausmachen? Dann
                                        schreib mir.
                                    </legend>
                                    <input type="hidden" name="csrf_token" value="<?= $_SESSION["token"] ?>">
                                    <label aria-hidden="true" for="person">
                                        <input id="person" name="person" type="hidden" value="" />
                                    </label>
                                    <label class="infos__email" for="email">
                                        <input id="email" name="email" type="email" placeholder="Email-Adresse" />
                                        <span class="sr-only">Email-Adresse</span>
                                    </label>
                                    <label class="infos__name" for="name">
                                        <input id="name" name="name" type="text" placeholder="Vollständiger Name" />
                                        <span class="sr-only">Vollständiger Name</span>
                                    </label>
                                    <label class="infos__nachricht" for="nachricht">
                                        <textarea name="nachricht" id="nachricht" cols="30" rows="10"
                                            placeholder="Worum gehts?"></textarea>
                                        <span class="sr-only">Nachricht</span>
                                    </label>
                                </fieldset>
                            </div>

                            <div class="form__col">
                                <fieldset class="callback">
                                    <legend>Oder soll ich Dich anrufen?</legend>
                                    <div id="callbackChoices" class="callback__auswahl">
                                        <label class="callback__auswahl-jup" for="jup">
                                            <input checked class="sr-only" id="jup" type="radio" name="callback"
                                                value="jup" />
                                            <span>Jup!</span>
                                        </label>
                                        <label class="callback__auswahl-nope" for="nope">
                                            <input checked class="sr-only" id="nope" type="radio" name="callback"
                                                value="nope" />
                                            <span>Nope</span>
                                        </label>
                                    </div>
                                    <div id="callbackOption" class="callback__option v-hidden">
                                        <label class="callback__telefon" for="telefon">
                                            <input id="telefon" name="telefon" type="text"
                                                placeholder="Handynummer/Telefonnummer" />
                                            <span class="sr-only">Handynummer/Telefonnummer</span>
                                        </label>
                                        <label class="callback__termin" for="termin">
                                            <span class="sr-only">Bevorzugter Termin</span>
                                            <input id="termin" name="termin" type="text"
                                                placeholder="Bevorzugter Termin?" onfocus="(this.type='date')" />
                                        </label>
                                        <p class="callback__datenschutz">
                                            Du willst mehr zum Umgang mit Deinen Daten wissen? Alle
                                            Infos im Detail findest du hier:
                                            <a href="#">Datenschutzrichtlinie</a>
                                        </p>
                                    </div>
                                </fieldset>
                                <div id="formMessage" aria-hidden="true" class="form__message">
                                    <p id="formMessageText" class="form__message-text"></p>
                                </div>
                                <input id="formBtn" class="form__btn" type="submit" value="Abschicken" />
                                <p class="form__richtlinien">
                                    Durch das Abschicken stimmst du unseren Nutzungsbedingungen
                                    zu. In unserer Datenrichtlinie erfährst du, wie wir deine
                                    Daten erfassen, verwenden und teilen. Unsere
                                    Cookie-Richtlinie erklärt, wie wir Cookies und ähnliche
                                    Technologien verwenden.
                                </p>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </main>

    <!--=============== MAIN JS ===============-->
    <script src="js/main.js"></script>
</body>

</html>