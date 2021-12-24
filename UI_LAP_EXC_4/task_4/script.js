$(document).ready(function () {
  var sData = [];
  $(".date_start,.date_end").datepicker({
    changeMonth: true,
  });
  // datef datet
  var dateFormat = "mm/dd/yy";
  var from1 = $("#datef");
  var to1 = $("#datet");
  var from2 = $("#dfrom");
  var to2 = $("#dto");

  from1.on("change", function () {
    to1.datepicker("option", "minDate", getDate(this));
  });
  from2.on("change", function () {
    to2.datepicker("option", "minDate", getDate(this));
  });

  to1.on("change", function () {
    from1.datepicker("option", "maxDate", getDate(this));
  });
  to2.on("change", function () {
    from2.datepicker("option", "maxDate", getDate(this));
  });

  function getDate(element) {
    var date;
    try {
      date = $.datepicker.parseDate(dateFormat, element.value);
    } catch (error) {
      date = null;
    }

    return date;
  }

  $(".date_start,.date_end").datepicker({
    onSelect: function (date) {
      console.log("update end");
      if ($(this).hasClass("date_start")) {
        var target = $(this).siblings("input.date_end");
        target.datepicker("destroy");
        target.datepicker({
          minDate: date,
        });
      } else {
      }
    },
  });

  $(".date_end").datepicker({
    onSelect: function (date) {
      console.log("update start");
      var target = $(this).siblings("input.date_start");
      target.datepicker("destroy");
      target.datepicker({
        maxDate: date,
      });
    },
  });

  $("#addFlight").click(function () {
    $("#dialog").dialog({
      /*  width: 400,
      height: 250, */
      modal: true,
      show: {
        effect: "fade",
        duration: 200,
      },
      hide: {
        effect: "fade",
        duration: 200,
      },
      buttons: {
        Add: function () {
          var code = $('input[name="code"]').val().trim();
          var airline = $('input[name="airline"]').val().trim();
          var to = $('input[name="to"]').val().trim();
          var flightClass = $('select[name="class"]').val().trim();
          var dfrom = $('input[name="dfrom"]').val().trim();
          var dto = $('input[name="dto"]').val().trim();
          if (code == "" || airline == "" || flightClass == "" || to == "" || dfrom == "" || dto == "") {
            $("#err").text("Please fill all fields");
          } else {
            if (isNaN(code)) {
              $("#err").text("The Code must contain digits only, please try again");
            } else {
              // add the flight html
              $("#flights tbody").append(`
              <tr>
              <th>${code}</th>
              <th>${airline}</th>
              <th>${to}</th>
              <th>${flightClass}</th>
              <th>${dfrom}</th>
              <th>${dto}</th>
              </tr>
              `);
              $("#err").text("");

              // add the flight auto complete data
              sData.push({ label: to + " - " + airline, category: flightClass });
              console.log(sData);
              initSearch();
              // close dialog
              $(this).dialog("close");
              $("input").val("");
            }
          }
        },
      },
    });
  });

  function initSearch() {
    $.widget("custom.catcomplete", $.ui.autocomplete, {
      _create: function () {
        this._super();
        this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
      },
      _renderMenu: function (ul, items) {
        var that = this,
          currentCategory = "";
        $.each(items, function (index, item) {
          var li;
          if (item.category != currentCategory) {
            ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
            currentCategory = item.category;
          }
          li = that._renderItemData(ul, item);
          if (item.category) {
            li.attr("aria-label", item.category + " : " + item.label);
          }
        });
      },
    });
    // re-initiate the autocomplete
    $("#search").catcomplete({
      delay: 0,
      source: sData,
    });
  }
});
