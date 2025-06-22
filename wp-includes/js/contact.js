$(document).ready(function () {
    $("#contactForm").submit(function (e) {
        e.preventDefault();
        let mailBody = "";
        $(this).serializeArray().map(function (item) {
            mailBody += `<b>${[item.name]}: </b> ${item.value} <br/>`;
        });
        //console.log(mailBody);

         // Disable button during submission
        $("#submitBtn").prop("disabled", true);

        $.ajax({
            url: "https://avasarkars.com/mail/sendMail.php",
            type: "POST",
            dataType: 'json',
            // data: { mailBody, sendMail: true },
            data: { mailBody: mailBody, sendMail: "true" },
            success: function (response) {
                debugger;
                if (response.status === "success") {
                    showAlert("success", response?.message, "Good job!");
                    $("#contactForm")[0].reset();
                }
                else {
                    showAlert("error", "Something went wrong! Unable to send message!!!", "Oops!");
                }
                 $("#submitBtn").prop("disabled", false);
            },
            error: function (request, status, error) {
                showAlert("error", "Something went wrong while sending request to server!", "Oops!");
            }

        });
    });
});

const showAlert = (status, message, title) => {
    swal({
        title: title,
        text: message,
        icon: status
    });
}