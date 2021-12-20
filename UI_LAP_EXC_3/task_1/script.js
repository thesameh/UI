$(document).ready(function () {
  var click = 0;
  var val_1 = "";
  var val_2 = "";
  $(".game_card").hover(
    function () {
      if (!$(this).hasClass("done")) {
        $(this).css("background", "linear-gradient(#1e9928, #8fe87d)");
      }
    },
    function () {
      if (!$(this).hasClass("done")) {
        $(this).css("background", "linear-gradient(#1e5799, #7db9e8)");
      }
    }
  );

  $(".game_card").click(function () {
    var element = $(this);
    click++;
    if (!element.hasClass("active") && !element.hasClass("done")) {
      element.addClass("active");
      element.find(".nr").hide();
      element.find(".text").show();

      if (click == 1) {
        val_1 = element.find(".text").html().trim();
      }

      if (click == 2) {
        val_2 = element.find(".text").html().trim();
        if (val_1 == val_2) {
          $(".game_card.active").css("background", "linear-gradient(#636363, #adadad)").addClass("done").removeClass("active");
        } else {
          setTimeout(function () {
            $(".active .nr").show();
            $(".active .text").hide();
            $(".active").removeClass("active");
          }, 300);
        }
        click = 0;
        val_1 = "";
        val_2 = "";
      }
    }
  });
});
