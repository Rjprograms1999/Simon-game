$(document).keydown(playGame);

var levelNumber = 0;
var displayedPattern = [];
var userClickedPattern = [];

function playGame() {
  $(document).off("keydown"); //turn off the keydown event after first press
  levelNumber++;
  $("h1").text("level " + levelNumber);

  var buttonArray = ["green", "red", "yellow", "blue"];
  var randomButton = buttonArray[Math.floor(Math.random() * buttonArray.length)];
  $("." + randomButton)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  var sound = new Audio("sounds/" + randomButton + ".mp3");
  sound.play();

  displayedPattern.push(randomButton);
  console.log(displayedPattern);
  userClickedPattern = [];
  $(".btn").off("click"); //remove any previous clicks from the user and start from fresh in this level
  $(".btn").on("click", handleUserClick);
}

function handleUserClick() {
  var clickedButton = $(this).attr("id");

  userClickedPattern.push(clickedButton);

  var clickSound = new Audio("sounds/" + clickedButton + ".mp3");
  clickSound.play();
  $("#" + clickedButton).addClass("pressed");

  // Remove the 'pressed' class after 100 second (i,e 100/1000=0.1sec)
  setTimeout(function () {
    $("#" + clickedButton).removeClass("pressed");
  }, 100);
  var currentLevel = userClickedPattern.length - 1;
  if (displayedPattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === displayedPattern.length) {
      setTimeout(playGame, 1000); //call this function after 0.7sec
    }
  } else {
    // If the user clicked the wrong button, game over
    $("h1").text("Game Over! Press any key to restart.");
    $("body").css("background-color", "red");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    setTimeout(function () {
      $("body").css("background-color", "");
    }, 200); // remove background-color=red from body after 0.2s

    $(document).keydown(function () {
      levelNumber = 0;
      displayedPattern = [];
      userClickedPattern = [];

      if (levelNumber === 0) {
        $("h1").text("Level " + levelNumber);
        playGame();
      }
    });
  }
}
