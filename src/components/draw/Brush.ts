import { Layout, Position } from "../../api/layout";
import { Color, PaintCommand } from "./hooks/usePaint";

export class Brush {

  public readonly color: Color;
  private lastPixels: Position[];

  constructor(color: Color) {
    this.color = color;
    this.lastPixels = [];
  }

  paint(position: Position, layout: Layout): PaintCommand {
    const [x, y] = position;
    const coordinates = [[x, y], [x-1, y], [x+1, y], [x, y+1], [x, y-1]] as const;
    const newPixels = coordinates
      .filter(coords => this.lastPixels.every(pixel => !this.pixelsEqual(coords, pixel) &&
                        layout.some(({display, position}) => this.inBounds(coords, position, display.resolution))));
    this.lastPixels = newPixels;
    return {color: this.color, pixels: newPixels};
  }

  private pixelsEqual(p1: Position, p2: Position) {
    return p1[0] === p2[0] && p1[1] === p2[1];
  }

  private inBounds(coordinates: Position, rectPos: Position, rectSize: Position): boolean {
    const [x, y] = coordinates;
    const [w, h] = rectSize;
    return (x >= rectPos[0] && x < rectPos[0] + w && y >= rectPos[1] && y < rectPos[1] + h);
  }

}