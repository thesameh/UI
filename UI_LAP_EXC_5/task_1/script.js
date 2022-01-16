$(document).ready(function () {
  var sampleMovies = [
    {
      value: "oblivion",
      label: "Oblivion",
      desc: "A veteran assigned to extract Earth's remaining resources begins to question what he knows about his mission and himself.",
    },
    {
      value: "enders-game",
      label: "Ender's Game",
      desc: "Young Ender Wiggin is recruited by the International Military to lead the fight against the Formics, a genocidal alien race which nearly annihilated the human race in a previous invasion.",
    },
    {
      value: "elysium",
      label: "Elysium",
      desc: "In the year 2154, the very wealthy live on a man-made space station while the rest of the population resides on a ruined Earth. A man takes on a mission that could bring equality to the polarized worlds.",
    },
  ];

  $("#project")
    .autocomplete({
      source: sampleMovies,
      focus: function (event, ui) {
        $("#project").val(ui.item.label);
        return false;
      },
      select: function (event, ui) {
        $("#project").val(ui.item.label);
        $("#project-description").html(ui.item.desc);
        return false;
      },
    })
    .autocomplete("instance")._renderItem = function (ul, item) {
    return $("<li>")
      .append("<div>" + item.label + "<br>" + item.desc + "</div>")
      .appendTo(ul);
  };
});
