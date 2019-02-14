// Global Variables

var characterSelected = false;
var enemies;
var selectedCharacter;

// Character/Enemy Selection
$(".character").on("click", function () {
  
  if (characterSelected === false) {
    selectedCharacter = this;
    $(selectedCharacter).attr("id", "selected-character");

    console.log('selectedCharacter:', selectedCharacter)
    
    // Set enemies var before moving #selected-character
    enemies = $(this).siblings()
    console.log('enemies:', enemies)

    // Move #selected-character to #your-character
    $(this).appendTo("#your-character");
    characterSelected = true;
    // Hide Character Select
    $("#select-character-container").attr("class", "hide");

    // Move enemies to #enemies
    $(enemies).appendTo("#enemies");
    // Add enemies class
    $("#enemies").children().addClass("enemies");
  }
});