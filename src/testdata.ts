import { type Instrument, RandomInstrument } from "./instrument.ts";
import { Position } from "./position.ts";

// Generate an instrument
export function makeInstrument(): Instrument {
  return new RandomInstrument();
}

// Generate a position
export function makePosition(amount: number): Position {
  const instr: Instrument = makeInstrument();
  const price = instr.price();
  const position = new Position(instr, amount/price, price);
  return position;
}
