$(document).ready(function () {
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
          if (code == "" || airline == "" || flightClass == "" || to == "") {
            $("#err").text("Please fill all fields");
          } else {
            if (isNaN(code)) {
              $("#err").text("The Code must contain digits only, please try again");
            } else {
              $("#flights tbody").append(`
              <tr>
              <th>${code}</th>
              <th>${airline}</th>
              <th>${to}</th>
              <th>${flightClass}</th>
              </tr>
              `);
              $("#err").text();
              $(this).dialog("close");
            }
          }
        },
      },
    });
  });
});
