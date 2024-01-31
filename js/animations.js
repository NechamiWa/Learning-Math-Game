function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}


var myGamePiece;

var mySound;
var myMusic;

function startGame() {
  myGamePiece = new component(30, 30, "red", 10, 120);
  mySound = new sound("../sounds/music.mp3");
  myMusic = new sound("../sounds/music.mp3");
  myMusic.play();
  //myGameArea.start();
}
startGame();