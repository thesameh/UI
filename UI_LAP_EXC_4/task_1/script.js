$(document).ready(function () {
  $("#effect").change(function () {
    activateToolTop($("#effect").val().trim());
  });

  activateToolTop($("#effect").val().trim());
  function activateToolTop(animation) {
    if (animation == "myAnimation") {
      $("#ime").tooltip({
        show: null,
        position: {
          my: "left top",
          at: "left bottom",
        },
        open: function (event, ui) {
          ui.tooltip.animate({ left: ui.tooltip.position().left + $("#ime").width() }, 300);
          setTimeout(function () {
            ui.tooltip.animate({ left: ui.tooltip.position().left - $("#ime").width() }, "fast");
          }, 300);
        },
      });
    } else {
      $("#ime").tooltip({
        show: {
          effect: animation,
        },
      });
    }
  }
});
