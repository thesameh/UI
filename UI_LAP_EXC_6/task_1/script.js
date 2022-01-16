$(document).ready(function () {
  var pass = "";
  $("#pass_dialog").dialog({
    height: "auto",
    width: 400,
    modal: true,
    buttons: [
      {
        text: "OK",
        click: function () {
          $("#dialog_error").html("");
          var err = false;
          pass = $("#password").val().trim();
          var passr = $("#passwordr").val().trim();
          var special_characters_regex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,100}$/;
          console.log(special_characters_regex.test(pass));
          if (pass == "") {
            err = "Password is mandatory";
          } else if (!special_characters_regex.test(pass)) {
            err =
              "Password is not valid<br> <small>The password should be at least 6 characters long and containes at least one special character</small>";
          } else if (pass != passr) {
            err = "Passwords don't match";
          }

          if (err === false) {
            $(this).dialog("close");
          } else {
            $("#dialog_error").html(err);
          }
        },
      },
    ],
  });

  $("#insert").click(function () {
    $("#insert_to").text($("#email").val().trim());
    $("#insert_cc").text($("#cc").val().trim());
    $("#insert_subject").text($("#subject").val().trim());

    $("#insert_dialog").dialog({
      height: "auto",
      width: 400,
      modal: true,
      buttons: [
        {
          text: "Insert",
          click: function () {
            $("#content_placeholder").text($("#content").val().trim());
            $(this).dialog("close");
          },
        },
        {
          text: "Clear",
          click: function () {
            $("#content_placeholder").text("");
            $("#content").val("");
          },
        },
      ],
    });
  });

  $("#send").click(function () {
    // an additional check could be added here to see if the email is empty 

    $("#pass_check_dialog").dialog({
      height: "auto",
      width: 400,
      modal: true,
      buttons: [
        {
          text: "Ok",
          click: function () {
            $("#dialog_error_2").text("");

            var pass_check = $("#password_check").val().trim();
            if (pass_check === pass) {
              $("#dialog_error_2").text("Succesfully sent!").css("color", "green");
            } else {
              $("#dialog_error_2").text("Password is incorrect");
            }
            $(this).dialog("close");
            display_status();
          },
        },
      ],
    });
  });

  function display_status() {
    $("#status_dialog").dialog({
      height: "auto",
      width: 400,
      modal: true,
      buttons: [
        {
          text: "Ok",
          click: function () {
            $("#dialog_error_2").text("");
            $(this).dialog("close");
          },
        },
      ],
    });
  }

  
});
