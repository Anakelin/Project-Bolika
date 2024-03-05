var sk0 = getDiv("sk0");
var sk1 = getDiv("sk1");
var sk2 = getDiv("sk2");
var sk3 = getDiv("sk3");
function playSkill(id, user, enemy) {
    skill(id, user, enemy);
}

var user = document.getElementById("user-char");
var enemy = document.getElementById("enemy-char");

sk0.addEventListener("click", function() {
    playSkill(0, user,enemy);
});

sk1.addEventListener("click", function() {
    playSkill(1, user,enemy);
});

sk2.addEventListener("click", function() {
    playSkill(2, user,enemy);
});

sk3.addEventListener("click", function() {
    playSkill(3, user,enemy);
});