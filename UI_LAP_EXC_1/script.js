$(document).ready(function () {
  //task 1
  setInterval(() => {
    dateCount();
  }, 1000);

  //task 2
  submitForm();

  //task 3
  changeTable();

  //task 4
  $("#change").click(changeList);

  //task 5
  controlFontSize();
});

function dateCount() {
  var deadline = "2021-11-17 00:00:00";

  var date1 = new Date(deadline);
  var date2 = new Date();
  var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  /*
  to add days to the counter activate this and add (diffDays + " days and " +) to the html code below
  var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));  
  timeDiff = diffDays > 0 ? timeDiff - diffDays * 1000 * 3600 * 24 : timeDiff;
  */

  var diffHours = Math.floor(timeDiff / (1000 * 3600));
  timeDiff = diffHours > 0 ? timeDiff - diffHours * 1000 * 3600 : timeDiff;

  var diffMinutes = Math.floor(timeDiff / (1000 * 60));
  timeDiff = diffMinutes > 0 ? timeDiff - diffMinutes * 1000 * 60 : timeDiff;

  var diffSeconds = Math.floor(timeDiff / 1000);
  var text = date1 > date2 ? " has left until the end of the deadline for the homework assignment." : " has left since the end of the deadline for the homework assignment.";
  $("#counter").html("<span id='timer'>" + diffHours + ":" + diffMinutes + ":" + diffSeconds + "</span>" + text);
}

function submitForm() {
  $("#form").submit(function (e) {
    e.preventDefault();
    var err = false;
    var name = $("#name").val().trim() !== "" ? $("#name").val().trim() : (err = true);
    var a_name = $("#a_name").val().trim() !== "" ? $("#a_name").val().trim() : (err = true);
    var gender = $('[name="gender"]:checked').length > 0 ? $('[name="gender"]:checked').attr("gender") : (err = true);
    var genre = $("#genre").val().trim(); // no need to check since there is a defualt option
    if (err) {
      alert("All fields are required");
    } else {
      alert(`${name}, ${gender}, ${genre} - successfully applied`);
    }
  });
}

function changeTable() {
  var ri = 0;
  $("tr").each(function () {
    var row = $(this);

    if (ri % 2 == 0) {
      row.addClass("color");
    }
    ri++;

    var ci = 0;
    row.find("td").each(function () {
      var col = $(this);

      if (ci % 2 == 0) {
        col.addClass("border");
      }
      ci++;
    });
  });
}

function changeList() {
  if ($(this).hasClass("changed")) {
    $("#list ol").css("color", "#0000FF");
  } else {
    $("#list ol").css("color", "#000");
  }

  $(this).toggleClass("changed");
}

function controlFontSize() {
  $("#font_size_controlled")
    .children()
    .each(function () {
      var current_size = $(this).css("font-size");
      $(this).attr("init_fs", current_size);
    });

  $(".change_btn").click(function () {
    var change = $(this).attr("change");
    if (change == "init") {
      $("#font_size_controlled")
        .children()
        .each(function () {
          $(this).css("font-size", $(this).attr("init_fs"));
        });
    } else {
      $("#font_size_controlled")
        .children()
        .each(function () {
          var current_size = $(this).css("font-size");
          $(this).css("font-size", parseInt(current_size) + parseInt(change));
        });
    }
  });
}