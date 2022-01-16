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

              var email = $("#email").val().trim();
              var subject = $("#subject").val().trim();

              var sent_el = $("<div>")
                .addClass("sent_email")
                .html("To: " + email + "<br>Subject: " + subject);
              $("#sent_emails").append(sent_el);

              // clear the form
              $("#email").val("");
              $("#subject").val("");
              $("#cc").val("");
              $("#content").val("");
              $("#password_check").val("");
              $("#content_placeholder").text("");
            } else {
              $("#dialog_error_2").text("Password is incorrect").css("color", "rgb(165, 0, 0)");
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

  var step = 1;
  $("#step_nav_prev").click(function () {
    if (!$(this).hasClass("disabled")) {
      step--;
      show_step(step);
    }
  });

  $("#step_nav_next").click(function () {
    if (!$(this).hasClass("disabled")) {
      step++;
      show_step(step);
    }
  });

  function show_step(step_nr) {
    $("#step_nav_prev, #step_nav_next").removeClass("disabled");

    if (step_nr == 1) {
      $("#step_nav_prev").addClass("disabled");
    }
    if (step_nr == 3) {
      $("#step_nav_next").addClass("disabled");
    }

    $(".step_block").hide();
    $("#step_" + step_nr).show();

    $(".step_ind").removeClass("current").removeClass("done");

    $(".step_ind").each(function () {
      var nr = $(this).attr("data-step");
      if (nr < step_nr) {
        $(this).addClass("done");
      }
      if (nr == step_nr) {
        $(this).addClass("current");
      }
    });
  }

  /* $("#sent_emails").selectable(); */
  $("#sent_emails").on("click", ".sent_email", function () {
    $(this).toggleClass("selected_email");
  });

  $("#delete_sent").click(function () {
    $(".selected_email").remove();
  });
});
