import "phaser-ce";

export class GameState extends Phaser.State {
  create() {
    let welcome = this.add.text(this.world.centerX, 80, "Welcome!", {
      font: "normal 80px Arial",
      fill: "#fff",
    });
    welcome.anchor.setTo(0.5, 0.5);
    console.log("hello from phaser game state");
  }
  update() {}
}
