<?php

session_start();

function bereinige($userEingabe, $encoding = 'UTF-8')
{
	return htmlspecialchars(
		strip_tags(trim($userEingabe)),
		ENT_QUOTES | ENT_HTML5,
		$encoding
	);
}

setlocale(LC_ALL, "de_DE", "deu_deu", "german");

function formatiereDatum($datum, $format = "d.m.Y")
{
	return utf8_encode(date($format, strtotime($datum)));
}



if (!empty($_POST["email"]) && !empty($_POST["name"]) && $_POST["csrf_token"] === $_SESSION["token"]) {

    if(filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {

        $name = bereinige($_POST['name']);
        $email = bereinige($_POST['email']);
        $person = bereinige($_POST['person']);
        $telefon = bereinige($_POST['telefon']);
        $termin = formatiereDatum(bereinige($_POST['termin']));
        $callback = bereinige($_POST['callback']);
        $nachricht = bereinige($_POST['nachricht']);
        
        $betreff = "Formularanfrage " . $name;
        $empfaenger_email = "testmail@william-lindner.de";
        $inhalt = "";

        $inhalt .= "Absender: " . $name . "\r\n";
        $inhalt .= "Email: " . $email . "\r\n";
        $inhalt .= "Empfänger:  " . $person . "\r\n";
        $inhalt .= "Nachricht:  " . $nachricht . "\r\n";
        $inhalt .= "Rückruf:  " . $callback . "\r\n";
        
        $header = array(
            'From' => 'test@mail.com',
            'Reply-To' => 'test@mail.com',
            'Content-Type' => 'text/plain',
            'charset' => 'utf-8'
        );

        if($callback == "jup") {
            $inhalt .= "Telefon: " . $telefon . "\r\n";
            $inhalt .= "Terminvorschlag: " . $termin . "\r\n";
        }

        mail($empfaenger_email, $betreff, $inhalt, $header);

        
        echo json_encode([
            "message" =>  "Wir haben Ihre Mail empfangen und melden uns ins Kürze bei Ihnen.",
            "error" => false,
        ]);


    } else {
        echo json_encode([
            "message" =>  "Ihre angegebene Email ist ungültig",
            "error" => true,
        ]);
    }

} else {
    echo json_encode([
    "message" =>  "Ein Fehler ist aufgetreten",
        "error" => true,
    ]);

}