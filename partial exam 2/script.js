$(document).ready(function () {
  /*  $(document).tooltip(); */

  // defauls city
  get_stores($("#cities li:first-child").attr("value"));

  $("#cities li").click(function () {
    var code = $(this).attr("value");
    get_stores(code);
  });

  function get_stores(code) {
    $("#stores .list_content").html("<img src='animate.gif' style='display:block;width:15px;'/>");

    var url = "https://" + code + ".herokuapp.com/store_data";

    $.ajax({
      url: url,
      dataType: "json",
      success: function (data) {
        $("#stores .list_content").html("");
        var stores = data.objects.stores;
        $.each(stores, function (i, store) {
          var store_el = $("<div>").addClass("store_container").attr("title", "Click for details");
          var store_text = $("<div>")
            .addClass("store_text")
            .html("Name: " + store.storeName + " <br>Region: " + store.region);
          var store_details = $("<div>")
            .addClass("store_details")
            .html("Open Hours: " + store.openHours + " <br>Address: " + store.address + " <br>Description: " + store.description);

          store_el.append(store_text);
          store_el.append(store_details);

          store_el.appendTo("#stores .list_content");
        });
      },
    });
  }

  // show store details
  $("#stores").on("click", ".store_container", function () {
    $(this).find(".store_details").slideToggle();

    setTimeout(function () {
      $("#stores button").hide();
      if ($(".store_details:visible").length > 0) {
        $("#stores button").show();
        console.log($(".store_details:visible").length);
      }
    }, 500);
  });

  //hide all details button
  $("#stores button").click(function () {
    $("#stores .store_details").slideUp();
  });

  // favourites
  $("#stores .list_content,#favs .list_content")
    .sortable({
      connectWith: ".connected_lists",
    })
    .disableSelection();
});
