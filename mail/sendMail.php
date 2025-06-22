<?php

    header("Access-Control-Allow-Origin: https://avasarkars.com"); // or your domain instead of *
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");


    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';


    if(isset($_POST["sendMail"]) && isset($_POST["mailBody"])){

        $mailBody = $_POST["mailBody"];

        $mail = new PHPMailer();
        $mail->SMTPDebug = 0;
        $mail->IsSMTP();
        $mail->SMTPAuth = true;
        $mail->Host = "smtp.gmail.com";
        $mail->Port = 587;
        $mail->SMTPSecure = 'tls';
        
        //havent read yet, but this made it work just fine
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => false
            )
        );

        $mail->Username = 'avasarkarsintl@gmail.com';
        $mail->Password = 'kfzfzuqjwxszhgur';
        $mail->setFrom('avasarkarsintl@gmail.com', 'SONARI');
        $mail->addReplyTo('avasarkarsintl@gmail.com', 'SONARI');
        $mail->addAddress('avasarkarsintl@gmail.com', 'SONARI');
        $mail->isHTML(true);

        $mail->Subject = "Avasarkar Form Data";
        $mail->Body = $mailBody;

        if ($mail->send()) {                    
            $response['status'] = "success";
            $response['message'] = "Message Send Successfully!!!";
            echo json_encode($response, JSON_PRETTY_PRINT);
        } else {
            $response['status'] = "error";
            $response['message'] = "Something went wrong! Unable to send message!!!";
            echo json_encode($response, JSON_PRETTY_PRINT);
            // echo $mail->ErrorInfo;
        }
    }
    else {
        $response['status'] = "error";
        // $response['message'] = "Failed while sending email!!!";
        $response['message'] = "Missing required POST data: 'sendMail' or 'mailBody'";
        echo json_encode($response, JSON_PRETTY_PRINT);
    }
?>