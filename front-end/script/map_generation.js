var map = document.getElementById("map");
var size = 30;
var userClass = "user-cell";
var moveClass = "move-cell";
var combatViewClass = "combat-view";
var startPos = [0,0];
var move = 5;
var background = getDiv(combatViewClass);
var backgroundLocation = "./resources/back/swamp";

function createMap() {
    background.style.backgroundImage = 'url('+backgroundLocation+'_main.png)';
    var style = "grid-template-columns:";
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            addCell(size, i, j);
        }
        style += "auto ";
    }
    map.setAttribute("style",style);
    var user = getDiv(startPos[0]+"-"+startPos[1]);
    showMove(user.id);
    user.classList.remove(moveClass)
    user.classList.add(userClass);
    //temp 
    /*
    getDiv("combat-content").classList.add("flip");
    */
    resetChar();
}

function removeClass(className) {
    console.log(className);
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
        element.classList.remove(userClass);
    });
}

function showMove(id) {
    var pos = id.split("-").map(Number);
    var endCell = [pos[0]+move,pos[1]+move];
    //clean board
    const elements = document.querySelectorAll(`.${moveClass}`);
    elements.forEach(element => {
        element.classList.remove(moveClass);
    });

    // down
    
    for (let i = 0; i < move+1; i++) {
        let xLimit = pos[0]+i;
        let yLimit = endCell[1]-i;
        let yStart = pos[1]+i-move;
        for (let x = pos[0]; x <= xLimit; x++) {
            for (let y = yStart; y <= yLimit; y++) {
                if(x < size && y < size && x > -1 && y > -1) {
                    getDiv(x+"-"+y).classList.add(moveClass);        
                }
            }
        }   
    }
    //up 
    for (let i = 0; i < move+1; i++) {
        let xLimit = pos[0]+i;
        let yLimit = endCell[1]-i;
        let yStart = pos[1]+i-move;
        for (let x = pos[0]; x <= xLimit; x++) {
            for (let y = yStart; y <= yLimit; y++) {
                let xValue = x-i;
                if(xValue < size && y < size && xValue > -1 && y > -1) {
                    
                    getDiv(xValue+"-"+y).classList.add(moveClass);            
                }
            }
        }   
    }
}

function addCell(size, i ,j) {
    var default_div = document.createElement("div");
    default_div.classList = "default-cell";
    var border = 2;
    var cellSize = Math.floor(map.offsetHeight / size)-border;
    default_div.setAttribute("style","width:"+cellSize+"px;height:"+cellSize+"px");
    default_div.id = i+"-"+j;
    
    default_div.addEventListener("mouseover", function() {
        if(!default_div.classList.contains("user-cell")) {
            default_div.classList.add("highlight-cell");    
        }
    })
    default_div.addEventListener("mouseout", function() {
        default_div.classList.remove("highlight-cell");
    })
    default_div.addEventListener("click", function() {
        if(default_div.classList.contains(moveClass)) {
            default_div.classList.remove("highlight-cell");
            const elements = document.querySelectorAll(`.${userClass}`);
            elements.forEach(element => {
                element.classList.remove(userClass);
            });
            showMove(default_div.id);
            default_div.classList.remove(moveClass);
            default_div.classList.add(userClass);
            //change back
            background.style.backgroundImage = 'url('+backgroundLocation+'_hall.png)';
            flip("combat-content");
        }
        
    })
    map.appendChild(default_div);
}

window.onload = createMap;
//TODO add walls and room gen. Walls can't be highlighted or moveColored. Also choose a color for it that's not grey