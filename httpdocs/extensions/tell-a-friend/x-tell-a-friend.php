<?php
    /* Sets a variable to halt processing until we know the submission is valid. */
    $proceed = false;

    /* Sets the amount of time allowed to complete the form. 5 minutes seems like a good amount of time. */
    $seconds = 60 * 5;

    /* Checkes that the cookie and security token are present. If they are, we continue processing. */
    if (isset($_POST['mms']) && isset($_COOKIE['token']) && $_COOKIE['token'] == md5('abrasax salt'.$_POST['mms'])) {
        $proceed = true;
    }

    /* Check all form inputs for possible XSS using strip_tags function. */
    $tafName = strip_tags($_POST['tafName']);
    $tafEmail = strip_tags($_POST['tafEmail']);
    $tafFriendEmail = strip_tags($_POST['tafFriendEmail']);
    $tafComment = strip_tags($_POST['tafComment']);

    /* Add the store and current time information. */
    $prodCode = strip_tags($_POST['prodCode']);
    $prodName = strip_tags($_POST['prodName']);
    $prodURL = strip_tags($_POST['prodURL']);
    $storeName = strip_tags($_POST['storeName']);
    $storeURL = strip_tags($_POST['storeURL']);
    $storeEmail = base64_decode($_POST['storeEmail']);
    $storeEmail = strip_tags($storeEmail);
    date_default_timezone_set('UTC');
    $now = time();

    /* Does the token match the timestamp when run through the md5() function? If not, we know something is up and exit. */
    if (!$proceed) {
        echo "Form processing halted for suspicious activity";
        exit;
    }

    /* Has too much time elapsed? If so, we take the customer to the error page. */
    if (((int)$_POST['mms'] + $seconds) < mktime()) {
        header('Location: ../ERRORS.html?form=taf&pbm=time');
        exit;
    }

    /* If e-mail is not valid show error message. This is a fail-safe measure in case the script is hit directly by a bot. */
    if (!preg_match('/^[_A-z0-9-]+((\.|\+)[_A-z0-9-]+)*@[A-z0-9-]+(\.[A-z0-9-]+)*(\.[A-z]{2,4})$/', $tafEmail)) {
        echo "ERRORS!!!!! Are You A Bot?!?!?!?!?!";
        exit();
    }

    /* Set TO Email Addresses */
    $to = $tafFriendEmail;

    /* Let's prepare the message for the e-mail. */
    $message = "<p>Hello,</p><p>Your friend, $tafName, was visiting the $storeName website and thought you might be interested in the following product:</p><p>Product Name: $prodName<br />Link to Product: <a href='$prodURL'>$prodURL</a></p><p>Here's what $tafName thought about $prod_name:<br /><em>\"$tafComment\"</em><p>Sincerely,<br />$storeName<br /><a href='$storeURL' title='$storeName'>$storeURL</a></p>";

    /* Is the OS Windows or Mac or Linux? */
    if (strtoupper(substr(PHP_OS, 0, 3) === 'WIN')) {
        $eol = "\r\n";
    }
    elseif (strtoupper(substr(PHP_OS, 0, 3) === 'MAC')) {
        $eol = "\r";
    }
    else {
        $eol = "\n";
    }

    /* Set Common Headers */
    $headers = 'From: '.$tafName.'<'.$tafEmail.'>'.$eol;
    $headers .= 'Reply-To:'.$tafName.'<'.$tafEmail.'>'.$eol;
    $headers .= 'Return-Path:'.$tafName.'<'.$tafEmail.'>'.$eol;    // These two to set reply address.
    $headers .= "Message-ID: <".$now." TheSystem@".$_SERVER['SERVER_NAME'].">".$eol;
    $headers .= "X-Mailer: PHP v".phpversion().$eol;          // These two are used to help avoid spam-filters.
    $headers .= 'MIME-Version: 1.0'.$eol;
    $headers .= 'Content-Type: text/html; charset=UTF-8' .$eol;

    /* Send the message using mail() function */
    mail($to, $tafName." found a product at ".$storeName." that you might like", $message, $headers);

    /* Redirect visitor to the thank you page on success...error page on failue. */
    if (mail) {
        header('Location: ../THANKYOU.html?form=taf');
        exit();
    }
    else {
        header('Location: ../ERRORS.html?form=taf&pbm=sent');
        exit();
    }
?>

<!-- Just a nice gag in case someone can actually visit this page. -->
<p>If you want to "attack" this form, <a href="../php/clearCookie.php">try this demo</a>.</p>