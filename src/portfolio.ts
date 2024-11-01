import type { Instrument } from "./instrument.ts";
import { Position, type PositionID } from "./position.ts";

/** A collection of instruments */
export class Portfolio {
  /* Open a portfolio optionally with number of positions */
  constructor(private readonly positions: Array<Position> = []) {}

  /** Count of positions in portfolio */
  public get length(): number {
    return this.positions.length;
  }

  /** Add a position to portfolio */
  public add(
    instrument: Instrument,
    amount: number,
    price: number,
    time: Date = new Date()
  ): PositionID {
    const position = new Position(instrument, amount, price, time);
    this.positions.push(position);
    return position.id;
  }

  /** Remove a position from portfolio */
  public remove(id: PositionID): Portfolio {
    const index = this.positions.findIndex((p) => p.id == id);
    if (index >= 0) this.positions.splice(index, 1);
    return this;
  }

  /** Total amount invested in positions */
  public get invested(): number {
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
      sum += position.profit(time)
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
