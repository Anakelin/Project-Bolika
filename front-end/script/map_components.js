const m = {
    Wall : "Wall",
    Hall : "Hall",
    Room : "Room"
};

var generatedMap1 = [
    [m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall],
    [m.Wall,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Wall],
    [m.Wall,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Wall],
    [m.Wall,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Wall],
    [m.Wall,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Wall],
    [m.Wall,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Wall],
    [m.Wall,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Wall],
    [m.Wall,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Wall],
    [m.Wall,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Wall],
    [m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall],
];

var generatedMap = [
    [m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall],
    [m.Wall,m.Wall,m.Wall,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Wall],
    [m.Wall,m.Wall,m.Wall,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Wall],
    [m.Wall,m.Wall,m.Wall,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Wall],
    [m.Wall,m.Hall,m.Hall,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Wall],
    [m.Wall,m.Wall,m.Wall,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Wall],
    [m.Wall,m.Wall,m.Wall,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Wall],
    [m.Wall,m.Wall,m.Wall,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Wall],
    [m.Wall,m.Wall,m.Wall,m.Room,m.Room,m.Room,m.Room,m.Room,m.Room,m.Wall],
    [m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall],
];

function isWall(id) {
    var div = getDiv(id);
    return div.classList.contains("wall");
}

function isRoom(id) {
    var div = getDiv(id);
    return div.classList.contains("room");
}