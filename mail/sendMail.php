<?php

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
        $mail->Host = "smtpout.secureserver.net";
        $mail->Port = 465;
        $mail->SMTPSecure = 'ssl';
        
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
        $mail->setFrom('avasarkarsintl@gmail.com', 'Avasarkars');
        $mail->addReplyTo('avasarkarsintl@gmail.com', 'Avasarkars');
        $mail->addAddress('avasarkarsintl@gmail.com', 'Avasarkars');
        $mail->isHTML(true);

        $mail->Subject = "Avasarkar Form Data";
        $mail->Body = $mailBody;
        // echo $mail->ErrorInfo;

        if ($mail->send()) {                    
            $response['status'] = "success";
            $response['message'] = "Message Send Successfully!!!";
            echo json_encode($response, JSON_PRETTY_PRINT);
        } else {
            $response['status'] = "error";
            $response['message'] = "Something went wrong! Unable to send message!!!";
            echo json_encode($response, JSON_PRETTY_PRINT);
        }
    }
    else {
        $response['status'] = "error";
        // $response['message'] = "Failed while sending email!!!";
        $response['message'] = "Missing required POST data: 'sendMail' or 'mailBody'";
        echo json_encode($response, JSON_PRETTY_PRINT);
    }
?>