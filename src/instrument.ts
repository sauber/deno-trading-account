import { nanoid } from "nanoid";

/** An instrument which can be traded and have changing price */
export abstract class Instrument {
  constructor(public readonly symbol: string) {}

  /** Get price of instrument at date */
  public abstract price(time?: Date): number;

  /** Does instrument have price data available at date */
  public abstract active(time?: Date): boolean;
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

  /** Random price with 10% of base price */
  public price(): number {
    // A random price +/- 10% from base
    const cur: number = 0.9 * this.base + Math.random() * this.base * 0.2;
    return cur;
  }

  /** Always active */
  public active(): boolean {
    return true;
  }
}
