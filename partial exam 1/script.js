$(document).ready(function () {
  $(document).tooltip();
  $(function () {
    $(".man_about_trig").click(function () {
      $(this).parent().find(".man_about_info").slideToggle();
    });
    $(".drone_comment").click(function () {
      $(this)
        .siblings(".drone_comment_window")
        .dialog({
          resizable: false,
          height: "auto",
          width: 400,
          modal: true,
          buttons: {
            Confirm: function () {
              $(this).dialog("Confirm");
            },
          },
        });
    });
  });
});
