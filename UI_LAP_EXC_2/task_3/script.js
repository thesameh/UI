$(document).ready(function () {
  var bi = 0;
  function add_book() {
    var valid = true;
    $("#add_book_form input, #add_book_form textarea").removeClass("ui-state-error");

    // get and validate data
    var name = $("#add_book_form  #name").val().trim();
    var a_name = $("#add_book_form  #a_name").val().trim();
    var form_comment = $("#add_book_form  #form_comment").val();

    if (name == "") {
      valid = false;
      $("#add_book_form  #name").addClass("ui-state-error");
    }
    if (a_name == "") {
      valid = false;
      $("#add_book_form  #a_name").addClass("ui-state-error");
    }

    // create a dialog component for the comment
    var book_comment_component = "";
    if (form_comment != "") {
      book_comment_component = `
      <div class="why" target="#why_dia_${bi}">
        Why is this book recomended?
      </div>
      
      <div id="why_dia_${bi}" class="why_dialog">
      ${form_comment}
      </div>

      `;
    }

    // add book if all okay
    if (valid) {
      var new_book = `
      <div id="book_${bi}" class="book_card">
          <h4>${name}</h4>
          <small>by ${a_name}</small>
          ${book_comment_component}
      </div>
      `;

      $("#books_container").append(new_book);
      if (book_comment_component != "") {
        $("#why_dia_" + bi).dialog({
          autoOpen: false,
          width: 350,
          modal: true,
        });
      }

      bi++;
      dialog.dialog("close");
    }
    return valid;
  }

  $("#main_container").on("click", ".why", function () {
    var why_dia = $($(this).attr("target"));
    why_dia.dialog("open");
  });

  dialog = $("#add_book_form").dialog({
    autoOpen: false,
    height: 600,
    width: 350,
    modal: true,
    buttons: {
      Add: add_book,
      Cancel: function () {
        dialog.dialog("close");
      },
    },
    close: function () {
      form[0].reset();
      $("#add_book_form input, #add_book_form textarea").removeClass("ui-state-error");
    },
  });

  form = dialog.on("submit", function (event) {
    event.preventDefault();
    add_book();
  });

  $("#add_book_trigger")
    .button()
    .on("click", function () {
      dialog.dialog("open");
    });

  $("#search_field").keyup(function () {
    var keywords = $(this).val().trim();
    console.log(keywords);
    $(".book_card").each(function () {
      if ($(this).attr("id") != "add_book_trigger" && keywords != "" && !$(this).html().includes(keywords)) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });
});
