// alert("connect test");
////////////////////objects////////////////////
var characters = [
    {
        "charactKey": 0,
        "character_name": "Swarm of Midichlorian-infused Bees", 
        "health_points": 100, 
        "attack_power": 100, 
        "counter_attack_power": 100,
        "character_image": "assets/images/midiclor.jpg"
    },
    {
        "charactKey":1,
        "character_name": "Watto", 
        "health_points": 100, 
        "attack_power": 100, 
        "counter_attack_power": 100,
        "character_image": "assets/images/watto.png"
    },
    {
        "charactKey":2,
        "character_name": "Anakin", 
        "health_points": 100, 
        "attack_power": 100, 
        "counter_attack_power": 100,
        "character_image": "assets/images/anakin.jpg"
    },
    {
        "charactKey":3,
        "character_name": "Sebulba", 
        "health_points": 100, 
        "attack-power": 100, 
        "counter-attack-power": 100,
        "character_image": "assets/images/sebulba.png"
    }
]
////////////////////variables////////////////////
var userChar = "";//holds the position info characters[characterIndex] after is selected in the selectUserChar function
var enemyChar = ""//ditto for selected enemy
////////////////////booleans////////////////////
var userSelect = false;
var enemySelect = false;

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
    if(userSelect === false){
    var charID = $(this).attr("characterID");
    // console.log(charID);
    var charBox = $("<div>");
        charBox.attr("class", "col float-left bg-warning charBox m-1  p-2 text-center");
        charBox.attr("userId", characters[charID].charactKey);
        var thumb = $("<img class='img img-thumbnail charImg mx-auto d-block'>");
        thumb.attr("src", characters[charID].character_image);
        var charName = characters[charID].character_name;
        var health = characters[charID].health_points;
        charBox.append(charName, thumb, health);
        $("#chosen-character").append(charBox);
        userSelect = true;

        /////////remove stable, reprint boxes in enemy select area
        $("#characters-stable").empty();
        

           function availablePopulate(){

            for(var i=0; i<characters.length;i++){//////copy of charBuild function but with new destination
                var charBox = $("<div>");
                charBox.attr("class", "col-3 float-left bg-danger charBox m-1  p-2 text-center");
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
            console.log(divToHide);
            $(divToHide).attr("class", "d-none");
            userChar = characters[charID];

        }
        setTimeout(availablePopulate, 500);
    }
}
