<?php
    // Added input sanitizing to prevent injection

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
				$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]);

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Bitte füllen Sie das Formular komplett aus und senden Sie es erneut.";
            exit;
        }

        // Set the recipient email address.
        $recipient = "remo@inderbitzin.org";

        // Set the email subject.
        $subject = "inderbitzin.org Kontaktanfrage: $name";

        // Build the email content.
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Message:\n$message\n";

        // Build the email headers.
        $email_headers = "From: $name <$email>" . "\r\n" . "Reply-To: $email";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Besten Dank. Ihre Nachricht wurde erfolgreich gesendet.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Hoppla! Etwas ging schief und die Nachricht wurde nicht gesendet.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "Ein Problem ist aufgetreten, bitte versuchen Sie es erneut.";
    }

?>
