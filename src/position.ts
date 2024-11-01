import { nanoid } from "nanoid";
import type { Instrument } from "./instrument.ts";

export type PositionID = string;

export class Position {
  constructor(
    private readonly instrument: Instrument,
    private readonly amount: number,
    private readonly price: number,
    private readonly time: Date = new Date(),
    public readonly id: PositionID = nanoid(6)
  ) {}

  /** Original amount invested */
  public get invested(): number {
    return this.amount;
  }

  /** Current unrealized value */
  public value(time: Date = new Date()): number {
    const price = this.instrument.price(time);
    const opening = this.price;
    const gain = price / opening;
    const amount = this.amount;
    const result = amount * gain;
    console.log({ price, opening, gain, amount, result });
    // return this.amount * (this.instrument.price(time) / this.price);
    return result;
  }

  /** Current unrealized value */
  public profit(time: Date = new Date()): number {
    return this.value(time) - this.invested;
  }
}
