<?php
/**
 *  Скрипт для отправки данных вебформ в Консультационный центр.
 *  После отправки сообщения перенаправляет на index.html
 *  При обращении send.php?debug=1 с остальными параметрами (name, number либо email, text) будет отображатсья отладочная информация, вместо редиректа на страницу index.html
 */

$name = htmlspecialchars(trim($_REQUEST['name']));
$phone = htmlspecialchars(trim($_REQUEST['number']));

$topic = htmlspecialchars(trim($_REQUEST['form_text_1']));
$email = htmlspecialchars(trim($_REQUEST['email']));
$question = htmlspecialchars(trim($_REQUEST['text']));
$debug = boolval(htmlspecialchars(trim($_REQUEST['debug'])));

$title = '';
if ($name && $phone) {
    $title = 'Заказ обратного звонка с сайта ' . $_SERVER['HTTP_HOST'];
}
if ($email && $question) {
    $title = 'Вопрос от посетителя сайта ' . $_SERVER['HTTP_HOST'];
}

if ($title) {

    $mailFrom = 'no-reply@domrf.ru';
    $mailTo = 'consultant@domrf.ru';
    $message = '';
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    //$headers .= "Content-Transfer-Encoding: 8bit \r\n";
//    $headers .= "From: Заявка с сайта <" . $mailFrom . ">\r\n";
    $headers .="From: =?utf-8?b?".base64_encode('Заявка с сайта')."?= <".$mailFrom.">\r\n";
    $headers .= "Bcc: artem.subochev@domrf.ru\r\n";

    $message .= '<p>' . $title . '</p><br><br>';
    $message .= '<p>Дата: ' . date('d-m-Y H:i:s') . '</p>';

    if ($name) $message .= '<p>Имя: ' . $name . '</p>';

    if ($email) {
        $message .= '<p>Email: ' . $email . '</p>';
        $headers .= "Reply-To: " . $email . "\r\n";
    }

    if ($phone) $message .= '<p>Телефон: ' . $phone . '</p>';

    if ($topic) $message .= '<p>Категория: ' . $topic . '</p>';

    if ($question) $message .= '<p>Вопрос: ' . $question . '</p>';

    $message .= '<br><br><p>-------------------------------------------------------<p>';
    $message .= '<p>Письмо сгенерировано автоматически.</p>';

    $mailed = mail($mailTo, $title, $message, $headers);
    if ($debug) {
        echo $mailed ? 'Email sent!' : 'Error during send email ((';
        echo "<br><br>headers:<br><pre>";
        print_r($headers);
        echo "</pre><br>";
        echo "<br>Message:<br><pre>";
        print_r($message);
        echo "</pre>";
    }

} else {
    if ($debug){
        echo "Missed some parameters";
    }
}
if (!$debug) {
    $host = $_SERVER['HTTP_HOST'];
    $uri = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
    header("Location: http://$host$uri/index.html");
    exit;
}
