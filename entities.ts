import {Color} from './types';
import {Ray} from './raycasting';

type point = {x: number, y: number};
declare function rect(x: number, y: number, width: number, height: number, color: Color): null;

function distanceBetween(toPoint: point) {
  const {x, y} = toPoint;
  return Math.sqrt(x * x + y * y)
}

function vectorBetween(pointOne: point, pointTwo: point) {
  return {
    toX: pointOne.x - pointTwo.x,
    toY: pointOne.y - pointTwo.y,
  };
}

type BlockType = 'player' | 'enemy' | 'wall';

export class Block {
  observing: boolean = false;
  x: number;
  y: number;
  w: number;
  h: number;
  color: Color;
  moving: boolean = false;
  speed: number = 1;
  targetInVision: Block | null = null;
  rays: any[];
  type: BlockType;

  constructor(type: BlockType, x: number, y: number, w: number, h: number, color: Color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.rays = [];
    this.type = type;
  }

  get bounds() {
    const {x, y, w, h} = this;
    const boundaries = [
      {
        a: {x, y},
        b: {x: x + w, y},
      },
      {
        a: {x, y},
        b: {x, y: y + h}
      },
      {
        a: {x, y: y + h},
        b: {x: x + w, y: y + h}
      },
      {
        a: {x: x + w, y},
        b: {x: x + w, y: y + h}
      }
    ];
    return boundaries;
  }

  detect(blocks: Block[]) {
    this.observing = true;
    this.targetInVision = null;
    this.rays.forEach((ray) => {
      let detected = []
      blocks.forEach((block) => {
        block.bounds.forEach((bound) => {
          const intersect = ray.cast(bound);
          if (intersect && block.type === 'player') {
            ray.drawTo(intersect.x, intersect.y)
            this.targetInVision = block;
          }
        })
      })
    })
  }

  draw() {
    const {x, y, w, h, color} = this;
    const centrePoint = {x: x + w/2, y: y + h/2};
    if (this.observing) {
      this.rays.length = 0;
      for(let ray = 0; ray < 180; ray += 1) {
        this.rays.push(new Ray({x: centrePoint.x, y: centrePoint.y}, ray));
      }
    }

    return rect(x, y, w, h, color);
  }

  follow(target: Block) {
    const {x, y} = target;
    const toBlock = vectorBetween({x, y}, {x: this.x, y: this.y});
    const distToBlock = distanceBetween({x: toBlock.toX, y: toBlock.toY});
    if (target.moving && this.targetInVision) {
      this.x += toBlock.toX / distToBlock * this.speed;
      this.y += toBlock.toY / distToBlock * this.speed;
    }
  }
}
