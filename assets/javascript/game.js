// alert("connect test");
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

function charBuild(){
    for(var i=0; i<characters.length;i++){
        var charBox = $("<div>");
        charBox.attr("class", "col-2 float-left bg-light charBox m-1  p-2 text-center");
        charBox.attr("characterId", characters[i].charactKey);
        var thumb = $("<img class='img img-thumbnail charImg   mx-auto d-block'>");
        thumb.attr("src", characters[i].character_image);
        var charName = characters[i].character_name;
        var health = characters[i].health_points;
        charBox.append(charName, thumb, health);
        $("#characters-stable").append(charBox);
    }
    
}
charBuild();