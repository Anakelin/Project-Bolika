var map = document.getElementById("map");
var size = 10;
var userClass = "user-cell";
var moveClass = "move-cell";

var startPos = [0,0];
var move = 3;
function createMap() {
    setMainBackground();
    var style = "grid-template-columns:";
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            addCell(size, i, j,generatedMap[i][j]);
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
    
}

function removeClass(className) {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
        element.classList.remove(userClass);
    });
}

function checkTyles (id) {
    var pos = id.split("-").map(Number);
    var adiacentCells = [];
    var index = 0;
    var nord = pos[0] - 1;
    if(nord < size && nord > -1) {
        adiacentCells[index] = nord+"-"+pos[1];
        index++;
    }

    var sud = pos[0] + 1;
    if(sud < size && sud > -1) {
        adiacentCells[index] = sud + "-" + pos[1];
        index++;
    }

    var east = pos[1] + 1;
    if(east < size && east > -1) {
        adiacentCells[index] = pos[0] + "-" + east;
        index++;
    }

    var ovest = pos[1] - 1;
    if(ovest < size && ovest > -1) {
        adiacentCells[index] = pos[0] + "-" + ovest;
        index++;
    }
    var isConnected = false;
    adiacentCells.forEach(element => {
        isConnected = document.getElementById(element).classList.contains("move-cell") ? true : isConnected;
    });
    return isConnected;
}

function showMove(id) {
    var pos = id.split("-").map(Number);
    var endCell = [pos[0]+move,pos[1]+move];
    //clean board
    const elements = document.querySelectorAll(`.${moveClass}`);
    elements.forEach(element => {
        element.classList.remove(moveClass);
    });
    
    let east = pos[1] + move;
    let ovest = pos[1] -move;

    // up-left
    for (let i = 0; i < move+1; i++) {
        let xLimit = pos[0] - i;
        let yLimit = east - i;
        let yStart = pos[1];

        for (let x = pos[0]; x >= xLimit; x--) {
            let isStopped = false;
            for (let y = yStart; y <= yLimit; y++) {
                if(x < size && y < size && x > -1 && y > -1) {
                    if(!getDiv(x+"-"+y).classList.contains("wall")) {
                        var isValidTyle = checkTyles(x + "-" + y);
                        if(!isStopped || isValidTyle) {
                            getDiv(x+"-"+y).classList.add(moveClass);        
                        }       
                    }
                    else{
                        isStopped = true;
                    }
                }
            }
        }
    }
    // up-right
    for (let i = 0; i < move+1; i++) {
        let xLimit = pos[0] - i;
        let yLimit = ovest + i;
        let yStart = pos[1];

        for (let x = pos[0]; x >= xLimit; x--) {
            let isStopped = false;
            for (let y = yStart; y >= yLimit; y--) {
                if(x < size && y < size && x > -1 && y > -1) {
                    if(!getDiv(x+"-"+y).classList.contains("wall")) {
                        var isValidTyle = checkTyles(x + "-" + y);
                        if(!isStopped || isValidTyle) {
                            getDiv(x+"-"+y).classList.add(moveClass);        
                        }
                    }
                    else{
                        isStopped = true;
                    }
                }
            }
        }
    }

    // down-left
    for (let i = 0; i < move+1; i++) {
        let xLimit = pos[0] + i;
        let yLimit = east - i;
        let yStart = pos[1];

        for (let x = pos[0]; x <= xLimit; x++) {
            let isStopped = false;
            for (let y = yStart; y <= yLimit; y++) {
                if(x < size && y < size && x > -1 && y > -1) {
                    if(!getDiv(x + "-" + y).classList.contains("wall")) {
                        var isValidTyle = checkTyles(x + "-" + y);
                        if(!isStopped || isValidTyle) {
                            getDiv(x+"-"+y).classList.add(moveClass);        
                        }
                    }
                    else{
                        isStopped = true;
                    }
                }
            }
        }
    }
    // down-right
    for (let i = 0; i < move+1; i++) {
        let xLimit = pos[0] + i;
        let yLimit = ovest + i;
        let yStart = pos[1];

        for (let x = pos[0]; x <= xLimit; x++) {
            let isStopped = false;
            for (let y = yStart; y >= yLimit; y--) {
                if(x < size && y < size && x > -1 && y > -1) {
                    if(!getDiv(x+"-"+y).classList.contains("wall")) {
                        var isValidTyle = checkTyles(x + "-" + y);
                        if(!isStopped || isValidTyle) {
                            getDiv(x+"-"+y).classList.add(moveClass);        
                        }
                    }
                    else{
                        isStopped = true;
                    }
                }
            }
        }
    }
}

function addCell(size, i ,j,type) {
    var default_div = document.createElement("div");
    default_div.classList = "default-cell";
    var border = 2;
    var cellSize = Math.floor(map.offsetHeight / size)-border;
    default_div.setAttribute("style","width:"+cellSize+"px;height:"+cellSize+"px");
    default_div.id = i+"-"+j;
    
    default_div.addEventListener("mouseover", function() {
        if(!default_div.classList.contains("user-cell") && !default_div.classList.contains("wall")) {
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
            if(default_div.classList.contains("hall")) {
                setHallBackground();
            } else if (default_div.classList.contains("spawn")) {
                setSpawnBackground();
            } else {
                setMainBackground();
                //startBattleFlip();
            }
            
        }
        
    })
    
    if(type === m.Room) {
        default_div.classList.add("room");
    } else if(type === m.Wall) {
        default_div.classList.add("wall");
    } else if(type === m.Hall) {
        default_div.classList.add("hall");
    } else {
        startPos = [i,j];
        default_div.classList.add("spawn");
    }
    
    map.appendChild(default_div);
}