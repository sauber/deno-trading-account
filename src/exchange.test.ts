import { Exchange } from "./exchange.ts";
import type { Instrument } from "./instrument.ts";
import { makeInstrument } from "./testdata.ts";
import type { Position } from "./position.ts";
import {
  assertAlmostEquals,
  assertGreater,
  assertInstanceOf,
  assertLess,
} from "@std/assert";

Deno.test("Instance", () => {
  const ex = new Exchange();
  assertInstanceOf(ex, Exchange);
});

Deno.test("Buy", () => {
  const ex = new Exchange();
  const instr: Instrument = makeInstrument();
  const amount = 1000;
  const position: Position = ex.buy(instr, amount);
  assertAlmostEquals(position.price * position.units, amount);
});

Deno.test("Sell", () => {
  const ex = new Exchange();
  const instr: Instrument = makeInstrument();
  const buying = 1000;
  const position: Position = ex.buy(instr, buying);
  const selling = ex.sell(position);
  assertLess(selling / buying, 1.1 / 0.9);
  assertGreater(selling / buying, 0.9 / 1.1);
});
