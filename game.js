var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var clickPattern = [];
var level = 0;

// Function to generate a new sequence
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    animate(randomChosenColour);
    audiochoose(randomChosenColour);
    gamePattern.push(randomChosenColour);

    $("h1").text("Level " + gamePattern.length);
}


function handleClick(){
    $(".container").click(function(event){
        let clickedColor = event.target.id;
        animate(clickedColor);
        clickPattern.push(clickedColor);

       
        if (!compare()) {
            gameOver();
        } else if (clickPattern.length === gamePattern.length) {
            setTimeout(function(){
                clickPattern = [];
                nextSequence();
            }, 1000);
        }
    });
}


function compare(){
    for(let i = 0; i < clickPattern.length; i++){
        if(gamePattern[i] !== clickPattern[i]){
            return false;
        }
    }
    return true;
}
function animate(color){
    var clickedClass = "." + color; 
    $(clickedClass).addClass("pressed");
    setTimeout(function() { 
        $(clickedClass).removeClass("pressed");
    }, 100);
    audiochoose(color);
}


function playGame(){
    level = 0;
    gamePattern = [];
    clickPattern = [];

    $("h1").text("Press Any Key to Start");
    $(document).on("keydown", function() { 
        $(document).off("keydown"); 
        nextSequence();
    });
}

function gameOver(){
    $("h1").text("Game Over, Press Any Key to Restart");
    const audio5 = new Audio("sounds/wrong.mp3");
    audio5.play();

    setTimeout(function() {
        playGame(); 
    }, 1000);
}

function audiochoose(color){
    switch(color){
        case 'blue':
            new Audio("sounds/blue.mp3").play();
            break;
        case 'green':
            new Audio("sounds/green.mp3").play();
            break;
        case 'red':
            new Audio("sounds/red.mp3").play();
            break;
        case 'yellow':
            new Audio("sounds/yellow.mp3").play();
            break;
    }
}

playGame();
handleClick();
