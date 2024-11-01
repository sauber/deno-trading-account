import { nanoid } from "nanoid";
import type { Instrument } from "./instrument.ts";

export type PositionID = string;

export class Position {
  constructor(
    public readonly instrument: Instrument,
    public readonly amount: number,
    public readonly price: number,
    private readonly time: Date = new Date(),
    public readonly id: PositionID = nanoid(6)
  ) {}

  /** Original amount invested */
  public get invested(): number {
    return this.amount;
  }

  /** Current unrealized value */
  public value(time: Date = new Date()): number {
    const closing: number = this.instrument.price(time);
    const opening: number = this.price;
    const gain: number = closing / opening;
    const amount: number = this.amount;
    const result: number = amount * gain;
    return result;
  }

  /** Current unrealized profit */
  public profit(time: Date = new Date()): number {
    return this.value(time) - this.invested;
  }
}
