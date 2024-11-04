import {
  assertEquals,
  assertGreater,
  assertInstanceOf,
  assertLess,
} from "@std/assert";
import { RandomInstrument } from "./instrument.ts";
import { Position } from "./position.ts";

Deno.test("Instance", () => {
  const p = new Position(new RandomInstrument(), 0, 0);
  assertInstanceOf(p, Position);
});

Deno.test("Invested", () => {
  const units = 10;
  const price = 100;
  const p = new Position(new RandomInstrument(), units, price);
  assertEquals(p.invested, units * price);
});

Deno.test("Value", () => {
  const inst = new RandomInstrument();
  const units = 10;
  const price = inst.price();
  const purchaseValue = price * units;
  const pos = new Position(inst, units, price);
  const currentValue = pos.value();
  assertGreater(currentValue, (purchaseValue * 0.9) / 1.1);
  assertLess(currentValue, (purchaseValue * 1.1) / 0.9);
});
