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

        $mail->Username = 'sonaritraining@gmail.com';
        $mail->Password = 'kyqpxtxrnmvbwlrq';
        $mail->setFrom('sonaritraining@gmail.com', 'SONARI');
        $mail->addReplyTo('sonaritraining@gmail.com', 'SONARI');
        $mail->addAddress('sonaritraining@gmail.com', 'SONARI');
        $mail->isHTML(true);

        $mail->Subject = "SONARI FORM DATA";
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
        $response['message'] = "Failed while sending email!!!";
        echo json_encode($response, JSON_PRETTY_PRINT);
    }
?>