$(document).ready(function () {
  $("#datepicker").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
    beforeShowDay: function (date) {
      var disabled = true;
      numOfDays = new Date(date.getFullYear(), date.getMonth + 1, 0).getDate();
      if (numOfDays % 2 == 0) {
        disabled = date.getDate() % 2 == 0; //so for even days months, disable the odd days
      } else {
        disabled = date.getDate() % 2 != 0; //so for odd days months, disable the even days
      }
      return [disabled, ""];
    },
    /*  onChangeMonthYear: function () {
      setTimeout(() => {
        // current visible days
        var visDays = $('td[data-handler="selectDay"]:visible');
        visDays.dis;
      }, 100);
    }, */
  });
});
