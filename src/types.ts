export enum Color {
  Black = 0,
  DarkRed = 1,
  DarkBlue = 2,
  DarkGray = 3,
  Brown = 4,
  DarkGreen = 5,
  Red = 6,
  LightGray = 7,
  LightBlue = 8,
  Orange = 9,
  BlueGray = 10,
  LightGreen = 11,
  Peach = 12,
  Cyan = 13,
  Yellow = 14,
  White = 15,
}

export enum Button {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3,
  A = 4,
  B = 5,
}

export type Point = {x: number, y: number};

export interface Wall {
  a: Point;
  b: Point;
}
