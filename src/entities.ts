import {Color, Point, Wall} from './types';
import {Ray} from './raycasting';

import {distanceBetween, vectorBetween} from './util';

declare function print(input: string, x?: number, y?: number): void;
declare function rect(x: number, y: number, width: number, height: number, color: Color): null;
declare function rectb(x: number, y: number, width: number, height: number, color: Color): null;
type BlockType = 'player' | 'enemy' | 'wall';

export class Block {
  blocksInVision: Block[] = [];
  color: Color;
  moving: boolean = false;
  observing: boolean = false;
  rays: any[];
  speed: number = 1;
  type: BlockType;
  vision: number = 75;
  h: number;
  w: number;
  x: number;
  y: number;

  constructor(type: BlockType, x: number, y: number, w: number, h: number, color: Color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.rays = [];
    this.type = type;
  }

  get bounds(): Wall[] {
    const {x, y, w, h} = this;
    const boundaries = [
      {
        a: {x, y},
        b: {x: x + w, y},
      },
      {
        a: {x: x + w, y},
        b: {x: x + w, y: y + h}
      },
      {
        a: {x, y: y + h},
        b: {x: x + w, y: y + h}
      },
      {
        a: {x, y: y + h},
        b: {x, y}
      }
    ];
    return boundaries;
  }

  detect(blocks: Block[]) {
    this.observing = true;
    this.blocksInVision.length = 0;
    this.rays.forEach((ray) => {
      let closest: [{a: Point, b: Point}, number, Point, Block] | null = null;
      blocks.forEach((block) => {
        block.bounds.forEach((bound) => {
          const intersect = ray.cast(bound);
          if (intersect /* && ray.rayLength(intersect) < 50 //vision */) {
            const distance = ray.rayLength(intersect);
            if (closest) {
              if (distance < closest[1]) {
                closest[0] = bound;
                closest[1] = distance;
                closest[2] = intersect;
                closest[3] = block;
              }
            } else {
              closest = [bound, distance, intersect, block];
            }
          }
        })
      })
      if (closest) {
        const point: Point = closest[2];
        const block: Block = closest[3];
        const distance = closest[1];
        const isInVision = distance < this.vision;
        if (isInVision) {
          this.blocksInVision.push(block);
        }

        if (block.type === 'player') {
          ray.drawTo(point.x, point.y, isInVision ? Color.Red : Color.White);
        }
      }
    })
  }

  draw() {
    const {x, y, w, h, color} = this;
    const centrePoint = {x: x + w/2, y: y + h/2};
    if (this.observing) {
      this.rays.length = 0;
      for(let ray = 0; ray < 360; ray += 5) {
        this.rays.push(new Ray({x: centrePoint.x, y: centrePoint.y}, ray));
      }
    }
    if (this.type === 'wall') {
      return rectb(x, y, w, h, color);
    }
    return rect(x, y, w, h, color);
  }

  follow(target: Block) {
    const {x, y} = target;
    const toBlock = vectorBetween({x, y}, {x: this.x, y: this.y});
    const distToBlock = distanceBetween({x: toBlock.toX, y: toBlock.toY});
    if (target.moving && this.blocksInVision.indexOf(target) > -1) {
      this.x += toBlock.toX / distToBlock * this.speed;
      this.y += toBlock.toY / distToBlock * this.speed;
    }
  }
}
