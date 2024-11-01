import { RandomInstrument } from "./instrument.ts";
import { Position } from "./position.ts";

// Generate a position
export function makePosition(amount: number): Position {
  const instr: RandomInstrument = new RandomInstrument();
  const price = instr.price();
  const position = new Position(instr, amount, price);
  return position;
}
