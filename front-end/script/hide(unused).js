var battleId = "combat-box";
var boardId = "board-box";
var flipBtnId = "flip-btn";
var unflipBtnId = "unflip-btn";
var hpClass = ("hp");
var enClass = ("en");
var charClass = ("char-ui");
//Hides the UI in combat.

var hpUI = document.getElementsByClassName(hpClass);
var enUI = document.getElementsByClassName(enClass);
var charUI = document.getElementsByClassName(charClass);

function startBattleFlip(){
    hide();
    hide();
}

function endBattleFlip(){
    unHide();
    unHide();
}

function hide() {
    unHide();
    for (var i = 0; i < 2; ++i) {
        var item = hpUI[i];
        item.classList.add("hide");
        item = enUI[i];  
        item.classList.add("hide");
        item = charUI[i];
        item.classList.add("transparent");
    }
}

function unHide() {
    for (var i = 0; i < 2; ++i) {
        var item = hpUI[i];
        item.classList.remove("hide");
        item = enUI[i];  
        item.classList.remove("hide");
        item = charUI[i];
        item.classList.remove("transparent");
    }
}

getDiv(flipBtnId).onclick = startBattleFlip;

getDiv(unflipBtnId).onclick = endBattleFlip;