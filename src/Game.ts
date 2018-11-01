import "phaser-ce";

import { GameState } from "./states/GameState";
import { Config } from "./GameConfig";

export class Game extends Phaser.Game {
  constructor() {
    super(Config.gameWidth, Config.gameHeight, Phaser.CANVAS, "content", null);

    // Add game scenes here
    this.state.add("Game", GameState, false);

    // Start initial game scene
    this.state.start("Game");
  }
}
