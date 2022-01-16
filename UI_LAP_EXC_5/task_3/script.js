$(document).ready(function () {
  $("#birthdate").datepicker({
    changeMonth: true,
    changeYear: true,
  });

  $(".ui-widget-content").click(function () {
    $(this).toggleClass("ui-selected");
    updateSelected();
  });

  $("#add").click(function () {
    var item = $("#itemInput").val().trim();
    if (item !== "") {
      $("#items").append('<li class="ui-widget-content">' + item + "</li>");
    }
    $("#itemInput").val("");
  });

  $("#delete").click(function () {
    $(".ui-selected").remove();
    updateSelected();
  });

  function updateSelected() {
    $("#selected").html("");
    if ($(".ui-selected").length > 0) {
      $("#selected").append("<div>Selected items:</div>");
      $("#items")
        .children(".ui-selected")
        .each(function () {
          $("#selected").append("<span>" + $(this).text() + "</span>");
        });
    } else {
      $("#selected").html("");
    }
  }
});
