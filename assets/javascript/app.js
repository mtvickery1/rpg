// Global Variables
var characterSelected = false;
var defenderSelected = false;

var enemies;
var selectedCharacter;
var defender;

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
var characterArray = [amanda, kate, ricardo, mason];

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

    // Make selectedCharacter = selectedCharacterObject
    selectedCharacter = $(this).children()[1].name;
    characterArray.forEach(function (characterObject) {
      if (characterObject.name === selectedCharacter) {
        selectedCharacter = characterObject;
      }
    });

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

    // Sets defender = chosen defender
    defender = $(this).children()[1].name;
    characterArray.forEach(function (defenderObject) {
      if (defenderObject.name === defender) {
        console.log(defender);
        defender = defenderObject;
      }
    });


    // Call a function to begin fighting...or not, make on click
  }
});

// Attack Button Function
$("#attack-button").on("click", function () {

  if (defenderSelected === true) {

    console.log("attack");


    console.log('defender:', defender)

    // #selected-character attacks .defender
    attackDefender()
    // update damage done
    // updateDamage()
    // // display damage done
    // displayDamage()
    // // update new enemy health
    // updateHealth()
    // // display new enemy health
    // displayHealth()
    // // display enemy attacked
    // // check if defender health is === 0...
    // // if so, check if defendersDefeated === 3...
    // // if so, you win

    // // .defender attacks #selected-character
    // defenderAttacks()
    // update then display your new health
    // update then display damage done to you
    // check if your health is === 0...
    // if so, you lose

  }
})

function attackDefender() {
  console.log('defender health before attack:', defender.health)
  defender.health = defender.health - selectedCharacter.damage
  console.log('defender health after attack:', defender.health)
}