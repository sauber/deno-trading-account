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
  const amount = 100;
  const price = 100;
  const p = new Position(new RandomInstrument(), amount, price);
  assertEquals(p.invested, amount);
});

Deno.test("Value", () => {
  const amount = 100;
  const inst = new RandomInstrument();
  const price = inst.price();
  const pos = new Position(inst, amount, price);
  const value = pos.value();
  assertGreater(value, amount * 0.8);
  assertLess(value, amount * 1.2);
});

Deno.test("Profit", () => {
  const amount = 100;
  const inst = new RandomInstrument();
  const price = inst.price();
  const pos = new Position(inst, amount, price);
  const value = pos.profit();
  assertGreater(value, amount * -0.2);
  assertLess(value, amount * 0.2);
});
