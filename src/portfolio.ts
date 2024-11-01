import type { Position } from "./position.ts";

/** A collection of instruments */
export class Portfolio {
  /* Open a portfolio optionally with number of positions */
  constructor(public readonly positions: Array<Position> = []) {}

  /** Count of positions in portfolio */
  public get length(): number {
    return this.positions.length;
  }

  /** Add a position to portfolio */
  public add(position: Position): void {
    this.positions.push(position);
  }

  /** Remove a position from portfolio */
  public remove(position: Position): void {
    this.positions.forEach((item, index, array) => {
      if (item === position) array.splice(index, 1);
    });
  }

  /** Does position exist */
  public has(position: Position): boolean {
    return this.positions.some((item) => item === position);
  }

  /** Total amount invested in positions */
  public get invested(): number {
    // values.reduce((total: number, a: number) => total + a, 0);
    let sum = 0;
    for (const position of this.positions) {
      sum += position.invested;
    }
    return sum;
  }

  /** Total unrealized profit of all positions */
  public profit(time: Date = new Date()): number {
    let sum = 0;
    for (const position of this.positions) {
      sum += position.profit(time);
    }
    return sum;
  }

  /** Total unrealized value of all positions */
  public value(time: Date = new Date()): number {
    let sum = 0;
    for (const position of this.positions) {
      sum += position.value(time);
    }
    return sum;
  }
}
