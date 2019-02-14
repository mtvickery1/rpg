// Global Variables
var characterSelected = false;
var enemies;
var selectedCharacter;

// Character Constructor
function Character(name, health) {
  this.name = name;
  this.health = health;
}

// Characters
var amanda = new Character("amanda", 150);
var kate = new Character("kate", 130);
var ricardo = new Character("ricardo", 180);
var mason = new Character("mason", 200);

// Health
var amandaHealthDiv = $("#amanda-health");
var kateHealthDiv = $("#kate-health");
var ricardoHealthDiv = $("#ricardo-health");
var masonHealthDiv = $("#mason-health");

// Display Health
amandaHealthDiv.text(amanda.health);
kateHealthDiv.text(kate.health);
ricardoHealthDiv.text(ricardo.health);
masonHealthDiv.text(mason.health);

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