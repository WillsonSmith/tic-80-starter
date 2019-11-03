import {Color, Point} from './types';
import {distanceBetween, vectorBetween} from './util';

declare function line(xStart: number, yStart: number, xEnd: number, yEnd: number, color: Color): null;

interface Wall {
  a: Point;
  b: Point;
}

function direction(angle: number) {
  const radians = angle * (Math.PI / 180);
  return {x: Math.sin(radians), y: Math.cos(radians)};
}

export class Ray {
  position: Point;
  direction: Point;

  constructor(position: Point, angle: number) {
    this.position = position;
    this.direction = direction(angle);
  }

  setAngle(angle: number) {
    this.direction = direction(angle);
  }

  drawTo(x: number, y: number) {
    line(this.position.x, this.position.y, x, y, Color.White);
  }

  rayLength(intersect: Point) {
    const vec = vectorBetween({x: this.position.x, y: this.position.y}, intersect);
    return distanceBetween({x: vec.toX, y: vec.toY});
  }

  draw() {
    line(
      this.position.x,
      this.position.y,
      this.position.x + this.direction.x * 1000,
      this.position.y + this.direction.y * 1000,
      Color.DarkBlue);
  }

  cast(wall: Wall) {
    const {x: x1, y: y1} = wall.a;
    const {x: x2, y: y2} = wall.b;
    const {x: x3, y: y3} = this.position;
    const x4 = x3 + this.direction.x;
    const y4 = y3 + this.direction.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den === 0) {
      return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (t > 0 && t < 1 && u > 0) {
      return {x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1)};
    }
  }
}
