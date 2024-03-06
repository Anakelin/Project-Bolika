var combatViewClass = "combat-view";
var background = getDiv(combatViewClass);
var backgroundLocation = "./resources/back/swamp";

function setMainBackground() {
    background.style.backgroundImage = 'url('+backgroundLocation+'_main.png)';    
}

function setHallBackground() {
    background.style.backgroundImage = 'url('+backgroundLocation+'_hall.png)';    
}

function setSpawnBackground() {
    background.style.backgroundImage = 'url('+backgroundLocation+'_spawn.png)';    
}