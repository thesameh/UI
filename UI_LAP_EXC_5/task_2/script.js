$(document).ready(function () {
  $("#birthdate").datepicker({
    changeMonth: true,
    changeYear: true,
  });

  $(".ui-widget-content").click(function () {
    $(this).toggleClass("ui-selected");
  });

  $("#addInfo").click(function () {
    var error = false;
    var data = [];
    $("input").each(function () {
      if ($(this).val().trim() == "") {
        $(this).addClass("err");
        $(this).next().show();
        error = true;
      } else {
        $(this).removeClass("err");
        $(this).next().hide();
        data.push({
          name: $(this).attr("placeholder"),
          value: $(this).val().trim(),
        });
      }
    });

    var hobbies = [];
    $("#hobbies")
      .children(".ui-selected")
      .each(function () {
        hobbies.push($(this).text());
      });

    if (!error) {
      $("#dialog").html("");
      data.forEach(function (item) {
        var el = "<div>" + item.name + ": " + item.value + "</div>";
        $("#dialog").append(el);
      });

      $("#dialog").append("<div>Hobbies: " + hobbies.toString() + "</div>");

      $("#dialog").dialog({
        modal: true,
      });
    }
  });
});
