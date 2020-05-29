window.addEventListener("load",()=> {
    let game = document.getElementsByTagName("game")[0]
    let element = document.createElement("player")
game.appendChild(element);
let player = {
    x: 100,
    y: 100,
color: "red"
};

element.style.backgroundColor = player.color;
gameloop();
function gameloop(){
player.x = player.x + 2;
player.y += 1;
element.style.transform = `translate(${player.x}px, ${player.y}px)`
requestAnimationFrame(gameloop);
}

});
//# sourcemappingURL=main.js.map