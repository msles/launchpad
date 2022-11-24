/**
 * Represents an arrangment of Displays in 2D space.
 */
export type Layout = readonly DisplayPosition[];

/**
 * Represents a Display in 2D space.
 * The origin is in the top-left.
 */
export type DisplayPosition = {
  display: Display,
  position: Position
};

/**
 * Represents an (x,y) coordinate in 2D space.
 */
export type Position = readonly [number, number];

/**
 * Represents lighting device.
 * @example 
 * // A 64x64 LED matrix
 * const matrix = {
 *  type: DisplayType.Matrix,
 *  resolution: [64, 64]
 * }
 */
export type Display<T extends DisplayType = DisplayType> = {
  id: string,
  type: T, // is it a matix, led strip, or something else?
  resolution: readonly [number, number] // [width, height] in pixels
}

/**
 * The various types of lighting devices.
 */
enum DisplayType {
  Matrix, // An LED Matrix
  Strip   // A strip of LEDs (1xN)
}

/**
 * Determine the dimensions of the smallest rectangle that would enclose all displays
 * in the given layout.
 */
export function layoutBounds(layout: Layout): readonly [number, number] {
  const width = Math.max(
    ...layout.map(({display, position}) => position[0] + display.resolution[0]),
    0
  );
  const height = Math.max(
    ...layout.map(({display, position}) => position[1] + display.resolution[1]),
    0
  );
  return [width, height];
}