// title: Hello world
// author: Willson Smith
// desc: A hello world game
// script: js

import {Block} from './entities';
import {Color, Button} from './types';
declare function btn(button?: Button): boolean;
declare function cls(color: Color): null;


interface GameState {
  player: Block;
  enemies: Block[];
  walls: Block[];
}

const gameState: GameState = {
  player: new Block('player', 84, 84, 6, 6, Color.Red),
  enemies: [new Block('enemy', 20, 20, 6, 6, Color.DarkGreen), new Block('enemy', 200, 50, 6, 6, Color.LightBlue)],
  walls: [
    // new Block(0, 0, 1, 136, Color.DarkGreen),
    // new Block(239, 0, 1, 136, Color.DarkGreen),
    // new Block(0, 0, 240, 1, Color.DarkGreen),
    // new Block(0, 135, 240, 1, Color.DarkGreen)
    new Block('wall', 110, 110, 15, 15, Color.Yellow),
  ],
}

function TIC() {
  const {player, enemies, walls} = gameState;
  const {speed} = player;

  player.moving = false;
  if (btn()) { player.moving = true };

  if (btn(Button.Up)) {
    player.y -= 1 * speed;
  }
  if (btn(Button.Down)) {
    player.y += 1 * speed;
  }
  if (btn(Button.Left)) {
    player.x -= 1 * speed;
  }
  if (btn(Button.Right)) {
    player.x += 1 * speed;
  }

  cls(Color.Black);
  
  walls.forEach(wall => wall.draw());

  enemies.forEach(enemy => {
    enemy.draw();
    enemy.follow(player);
    enemy.detect([player].concat(walls));
  });

  player.draw();
}
