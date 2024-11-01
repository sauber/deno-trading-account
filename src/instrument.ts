import { nanoid } from "nanoid";

/** An instrument which can be traded and have changing price */
export abstract class Instrument {
  constructor(public readonly symbol: string) {}

  public price(_time: Date = new Date()): number {
    return 0;
  }
}

/** An instrument with a random symbol and random price */
export class RandomInstrument extends Instrument {
  /** Average price */
  private readonly base: number;

  constructor() {
    // Create a symbol of 4 chars
    const chars: string = nanoid(4).toUpperCase();
    super(chars);
    this.base = 1000 * Math.random();
  }

  /** Price of instrument now, or at time */
  public override price(): number {
    // A random price +/- 10% form base
    const cur: number = 0.9 * this.base + Math.random() * this.base * 0.2;
    return cur;
  }
}
