////////////////////////////////////////////////////////////////////////


// Global Variables
////////////////////////////////////////////////////////////////////////
var characterSelected = false;
var defenderSelected = false;
var youLose = false;
var youWin = false;

var enemies;
var selectedCharacter;
var defender;

var enemiesDefeated = 0;
var initialAttackPower;

var defenderDiv;

// Character Constructor
function Character(name, health, damage, counter) {
  this.name = name;
  this.health = health;
  this.damage = damage;
  this.counter = counter;
}

// Characters
var amanda = new Character("amanda", 100, 14, 5);
var kate = new Character("kate", 120, 8, 15);
var ricardo = new Character("ricardo", 150, 8, 20);
var mason = new Character("mason", 180, 7, 25);
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
////////////////////////////////////////////////////////////////////////


// On Click Events
////////////////////////////////////////////////////////////////////////
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
        // Stores initial attack power of defender
        initialAttackPower = selectedCharacter.damage;
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

  // Prevents multiple defenders from being selected
  if (defenderSelected === false) {

    // Moving to defender div
    $(this).appendTo("#defender");

    // Adding defender class for blue border
    $(this).removeClass("enemy").addClass("defender");

    // Setting defenderDiv = this to hide later
    defenderDiv = this;

    defenderSelected = true;

    // Sets defender = chosen defender
    defender = $(this).children()[1].name;
    characterArray.forEach(function (defenderObject) {
      if (defenderObject.name === defender) {
        console.log(defender);
        // Sets defender = defender object
        defender = defenderObject;
      }
    });
  }
});

// Attack Button Function
$("#attack-button").on("click", function () {

  if (youLose === false && youWin === false) {
    if (defenderSelected === true) {


      // #selected-character attacks .defender
      attackDefender()

      // check if defender health is === 0
      checkDefenderHealth()
      console.log(defenderSelected);
      if (defenderSelected === true) {
        // .defender attacks #selected-character
        defenderAttack()
      }

      // *****************************************************************
      // check if your health is === 0...
      checkYourHealth()
      console.log(youLose);
      if (youLose === true) {
        youLost()
        return
      }
      console.log("does this happen?");
      // if so, you lose

      if (defenderSelected === true) {
        // display info
        displayInfo()
      }

      // Increase attack damage each attack
      selectedCharacter.damage = selectedCharacter.damage + initialAttackPower
      console.log('initialAttackPower:', initialAttackPower)
      console.log("damage", selectedCharacter.damage);

    } else {
      // Empty #info
      $("#info").empty();

      var noEnemy = $("<div class='col-12'>No enemy here.</div>");
      $(noEnemy).appendTo("#info");
    }
  }
});
////////////////////////////////////////////////////////////////////////


// Functions
////////////////////////////////////////////////////////////////////////
function attackDefender() {
  // update health after attack
  defender.health = defender.health - selectedCharacter.damage
}

function defenderAttack() {
  // update health after attack
  selectedCharacter.health = selectedCharacter.health - defender.counter
}

function checkDefenderHealth() {
  if (defender.health <= 0) {
    enemiesDefeated++
    defenderSelected = false;
    $(defenderDiv).attr("class", "hide");

    // Enemy Defeated
    if (enemiesDefeated < 3) {
      console.log('enemiesDefeated:', enemiesDefeated)
      console.log("enemy defeated");
      console.log('defenderSelected:', defenderSelected)
      // Empty #info
      $("#info").empty();
      // Display you defeated an enemy
      var enemyDefeated = $("<div class='col-12'>You have defeated " + defender.name + ", you can choose to fight another enemy.</div>");
      $(enemyDefeated).appendTo("#info");
    }

    // Check if game over
    if (enemiesDefeated === 3) {
      // Empty #info
      $("#info").empty();
      // Display you defeated an enemy
      var winDiv = $("<div class='col-12'>Game Over. You Win!</div>");
      $(winDiv).appendTo("#info");
      youWin = true;

      // Display Restart Button
      reset();
    }
  }
}

function checkYourHealth() {
  if (selectedCharacter.health <= 0) {
    // Set to 0 for display
    selectedCharacter.health = 0;
    // You lost
    youLose = true;
  }
}

function youLost() {
  // Empty #info
  $("#info").empty();
  // Display you lost
  var lossDiv = $("<div class='col-12'>Game Over. You Lost!</div>");
  $(lossDiv).appendTo("#info");

  updateHealth()
  // Display Restart Button
  reset();
}




function displayInfo() {
  // #selected-character attacks .defender
  var attackerInfo = $("<div class='col-12'>You attacked " + defender.name + " for " + selectedCharacter.damage + " damage.</div>");

  // .defender attacks #selected-character
  var defenderInfo = $("<div class='col-12'>" + defender.name + " attacked you back for " + defender.counter + " damage.</div>");

  // Empty #info
  $("#info").empty();

  // Append info to #info
  $(attackerInfo).appendTo("#info");
  $(defenderInfo).appendTo("#info");

  updateHealth()
}

function reset() {
  var resetButton = $("#reset");
  $(resetButton).css("display", "inline");
  $("#reset").on("click", function () {
    location.reload();
  });
}

function updateHealth() {
  // display new enemy health
  amandaHealthDiv.text(amanda.health);
  kateHealthDiv.text(kate.health);
  ricardoHealthDiv.text(ricardo.health);
  masonHealthDiv.text(mason.health);
}