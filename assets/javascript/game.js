// alert("connect test");
////////////////////objects////////////////////
var characters = [
    {
        "charactKey": 0,
        "character_name": "Swarm of Midichlorian-infused Bees", 
        "health_points": 200, 
        "attack_power": 8, 
        "counter_attack_power": 25,
        "character_image": "assets/images/midiclor.jpg"
    },
    {
        "charactKey":1,
        "character_name": "Watto", 
        "health_points": 100, 
        "attack_power": 4, 
        "counter_attack_power": 10,
        "character_image": "assets/images/watto.png"
    },
    {
        "charactKey":2,
        "character_name": "Anakin", 
        "health_points": 180, 
        "attack_power": 10, 
        "counter_attack_power": 15,
        "character_image": "assets/images/anakin.jpg"
    },
    {
        "charactKey":3,
        "character_name": "Sebulba", 
        "health_points": 150, 
        "attack_power": 5, 
        "counter_attack_power": 12,
        "character_image": "assets/images/sebulba.png"
    }
]
////////////////////variables////////////////////
var userChar = "";//holds the position info characters[characterIndex] after is selected in the selectUserChar function
var enemyChar = "";//ditto for selected enemy
var roundCounter = 1;
var winCount = 0;
var attackStatement = $("#attackStatement");
var counterAttackStatement = $("#counterAttackStatement");
////////////////////booleans////////////////////
var userSelected = false;
var enemySelected = false;
var fightReady = false;
function charBuild(){
    for(var i=0; i<characters.length;i++){
        var charBox = $("<div>");
        charBox.attr("class", "col-2 float-left bg-light charBox m-1  p-2 text-center");
        charBox.attr("characterId", characters[i].charactKey);
        charBox.attr("Id", characters[i].charactKey);
        var thumb = $("<img class='img img-thumbnail charImg mx-auto d-block'>");
        thumb.attr("src", characters[i].character_image);
        var charName = characters[i].character_name;
        var health = characters[i].health_points;
        charBox.append(charName, thumb, health);
        $("#characters-stable").append(charBox);
    }
    
}
charBuild();

$(document).on("click", ".charBox", selectUserChar);


function selectUserChar(){
    if(userSelected === false){
    var charID = $(this).attr("characterID");
    // console.log(charID);
    var charBox = $("<div>");
        charBox.attr("class", "col-2 float-left bg-warning charBox m-1  p-2 text-center");
        charBox.attr("userId", characters[charID].charactKey);
        var thumb = $("<img class='img img-thumbnail charImg mx-auto d-block'>");
        thumb.attr("src", characters[charID].character_image);
        var charName = characters[charID].character_name;
        var health = "<p id='user-health-text'>" + characters[charID].health_points + "</p>";
        charBox.append(charName, thumb, health);
        $("#chosen-character").append(charBox);
        userSelected = true;

        /////////remove stable, reprint boxes in enemy select area///////////////////
        $("#characters-stable").empty();
        

        function availablePopulate(){

                for(var i=0; i<characters.length;i++){//////copy of charBuild function but with new destination
                    var charBox = $("<div>");
                    charBox.attr("class", "col-3 float-left bg-danger remCharBox charBox m-1  p-2 text-center");
                    charBox.attr("characterId", characters[i].charactKey);
                    charBox.attr("Id", characters[i].charactKey);
                    var thumb = $("<img class='img img-thumbnail charImg mx-auto d-block'>");
                    thumb.attr("src", characters[i].character_image);
                    var charName = characters[i].character_name;
                    var health = characters[i].health_points;
                    charBox.append(charName, thumb, health);
                    $("#enemies-available").append(charBox);
                }
                
                var divToHide = "#" + charID;
                $(divToHide).attr("class", "d-none");
                userChar = characters[charID];

            }
            setTimeout(availablePopulate, 500);
        }
}

$(document).on("click", ".remCharBox", selectDefender);

function selectDefender(){
    if(enemySelected === false){
        var charID = $(this).attr("characterID");
        var charBox = $("<div>");
        charBox.attr("class", "col-2 bg-dark text-white defendCharBox charBox m-1 mb-5 p-2 text-center"); 
        charBox.attr("userId", characters[charID].charactKey);
        var thumb = $("<img class='img img-thumbnail charImg mx-auto d-block'>");
        thumb.attr("src", characters[charID].character_image);
        var charName = characters[charID].character_name;
        var health = "<p id='enemy-health-text'>" + characters[charID].health_points + "</p>";
        charBox.append(charName, thumb, health);
        $("#defender").append(charBox);
        enemySelected = true;
        enemyChar = characters[charID];
        attackStatement.empty();
        counterAttackStatement.empty();

        ///////remove selected enemy from available area//////
        var divToHide = "#" + charID;
                $(divToHide).attr("class", "d-none");
        fightReady = true;


    }

}

$("#attack-btn").on("click", fightFunct);

function fightFunct(){
    if(fightReady === true){
           
        ///attack///
        enemyChar.health_points = enemyChar.health_points - (userChar.attack_power * roundCounter);
        $("#enemy-health-text").text(enemyChar.health_points);
        attackStatement = $("#attackStatement");
        attackStatement.attr("class", "text-light");
        attackStatement.text("You attacked " + enemyChar.character_name + " for " + (userChar.attack_power * roundCounter) + " damage.");
        ///counter attack///
        userChar.health_points = userChar.health_points - enemyChar.counter_attack_power;
        $("#user-health-text").text(userChar.health_points);
        counterAttackStatement = $("#counterAttackStatement");
        counterAttackStatement.text(enemyChar.character_name + " attacked you back for " + enemyChar.counter_attack_power + " damage.");



        roundCounter++;
        
   
    if(userChar.health_points<1){
        //window.location.reload(true);save this for when the game is ultimately won/lost, wrap in function and set off with setTimeout
        fightReady = false;
        $("#game-title").text("You Lose!!!!!!!");
        setTimeout(gameOver, 3000);

    }
    if(enemyChar.health_points<1){

        $("#defender").empty();
        winCount++;
        enemySelected = false;
        fightReady = false;
        counterAttackStatement.empty();
        attackStatement.text("You have defeated " + enemyChar.character_name + ". Please select another enemy.");
        attackStatement.attr("class", "text-dark");
        
        if(winCount === 3){
            attackStatement.text("You've defeated all your enemies, " + userChar.character_name + ". You truly were in Star Wars: The Phantom Menace.");
            successGif();
        }
    }
console.log(fightReady, winCount);
    }   
}

function successGif(){
    $("#game-title").text("You Win!!!!!!!");
    var gifDiv = $("<div class='text-center mt-5 mb-5'>");
    var gifImg = $("<img class = 'img-rounded mx-auto' src='https://media.giphy.com/media/G5qMQkMqIC3ja/giphy.gif'>");
    gifImg.attr("id", "successful-gif");
    gifDiv.append(gifImg);
    $("#success-div").append(gifDiv);
    setTimeout(gameOver, 5000);
}

function gameOver(){
    window.location.reload(true);
}