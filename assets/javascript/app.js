// Global Variables
var characterSelected = false;
var defenderSelected = false;
var enemies;
var selectedCharacter;

// Character Constructor
function Character(name, health, damage) {
  this.name = name;
  this.health = health;
  this.damage = damage;
}

// Characters
var amanda = new Character("amanda", 100, 14);
var kate = new Character("kate", 120, 8);
var ricardo = new Character("ricardo", 150, 8);
var mason = new Character("mason", 180, 7);

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

  // Prevents multiple characters from being selected
  if (characterSelected === false) {
    selectedCharacter = this;
    $(selectedCharacter).attr("id", "selected-character");

    // Set enemies var before moving #selected-character
    enemies = $(this).siblings()

    // Move #selected-character to #your-character
    $(selectedCharacter).appendTo("#your-character");
    characterSelected = true;

    // Hide Character Select Section
    $("#select-character-container").attr("class", "hide");

    // Move enemies to #enemies
    $(enemies).appendTo("#enemies");
    // Add enemies class
    $("#enemies").children().addClass("enemy");
  }
});

// Choose Enemy to Attack
$("#enemies").on("click", ".enemy", function () {

  console.log("clicked")

  // Prevents multiple defenders from being selected
  if (defenderSelected === false) {

    // Moving to defender div
    $(this).appendTo("#defender");

    // Adding defender class for blue border
    $(this).removeClass("enemy").addClass("defender");

    defenderSelected = true;

    // Call a function to begin fighting...or not, make on click
  }
});

// Attack Button Function
$("#attack-button").on("click", function () {

  if (defenderSelected === true) {

  console.log("attack");

  // #selected-character attacks .defender
  // display enemy attacked
  // update then display damage done
  // update then display new enemy health
  // check if defender health is === 0...
  // if so, check if defendersDefeated === 3...
  // if so, you win

  // .defender attacks #selected-character
  // update then display damage done to you
  // update then display your new health
  // check if your health is === 0...
  // if so, you lose

  // 

  }
})