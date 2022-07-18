var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $('#level-title').text('Level = ' + level)
        nextSequence();
        started = true;
    }
});

$(".btn").on('click', function (event) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        var audio = new Audio('../sounds/wrong.mp3');
        audio.play();
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);
        $('#level-title').text('Game Over, Press any Key to Restart');
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').text('Level = ' + level);
    randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);
};

function playSound(name) {
    var audio = new Audio('../sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass('pressed');
    setTimeout(function () {
        $("." + currentColour).removeClass('pressed');
    }, 100);
}