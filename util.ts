import {Point} from './types';

export function distanceBetween(toPoint: Point) {
  const {x, y} = toPoint;
  return Math.sqrt(x * x + y * y)
}

export function vectorBetween(pointOne: Point, pointTwo: Point) {
  return {
    toX: pointOne.x - pointTwo.x,
    toY: pointOne.y - pointTwo.y,
  };
}
