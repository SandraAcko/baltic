var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;


$(document).one("keydown", function() {   //use once on keydown, display title and level
        nextSequence();    
        $("#level-title").text("level "+ level);
});


function nextSequence() {

    userClickedPattern = []; // reset user array each level

    level++; // increase level

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4); //random number 0-3

    var randomChosenColour = buttonColours[randomNumber]; // finds random colour from array

    gamePattern.push(randomChosenColour); // pushes random colour to gamePattern array

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //adds flashing effect on chosen colour

    var buttonSound = new Audio("sounds/"+randomChosenColour+".mp3"); //select sound file based on chosen colour

    buttonSound.play(); 
}


$(".btn").on("click",function() {  // event listener to detect which colour user clicks

    var clickedColour = (this.id);

    var clickSound = new Audio("sounds/"+clickedColour+".mp3"); //play sound on click

    clickSound.play();

    $("#"+clickedColour).fadeIn(100).fadeOut(100).fadeIn(100).addClass("pressed"); //flash animation on click

    setTimeout(function () {
        $("#"+clickedColour).removeClass("pressed"); // remove 'pressed' style class
      }, 100);

    userClickedPattern.push(this.id);  // pushes clicked colour to user array

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //check arrays match 
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) { // if matches, play next sequence
            setTimeout(function () { 
                nextSequence();
            }, 1000);
        }
    } else {
        $("#level-title").text("Game Over, You reached Level "+level+"! Press any Key to Restart");
        $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
        console.log("Failure")
        $(document).keydown(function() {
            location.reload();
        });
    }
}

