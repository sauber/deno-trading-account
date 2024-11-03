import { type Instrument, RandomInstrument } from "./instrument.ts";
import { Position } from "./position.ts";

/** An exchange of random instruments */
export class Exchange {
  constructor(
    private readonly spread: number = 0,
    private readonly fee: number = 0
  ) {}

  /** A random instrument */
  public any(): RandomInstrument {
    return new RandomInstrument();
  }

  /** Buy instrument for a fee at spread higher than price */
  public buy(instrument: Instrument, amount: number, time: Date = new Date()): Position {
    amount -= amount * this.fee;
    const price: number = instrument.price(time) * (1 + this.spread);
    return new Position(instrument, amount, price);
  }

  /** Sell position for a fee at spread lower than price */
  public sell(position: Position, time: Date = new Date()): number {
    // const openingPrice: number = position.price * (1 - this.spread);
    // const sellingPrice: number = position.instrument.price(time) * (1+this.spread);
    // const gain = sellingPrice / openingPrice;
    const value: number = position.value(time);
    const amount = value * (1-this.spread);
    const fee = amount * this.fee;
    return amount-fee;
  }
}
