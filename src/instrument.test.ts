import { assertNotEquals, assertEquals, assertInstanceOf } from "@std/assert";
import { RandomInstrument, Instrument } from "./instrument.ts";

Deno.test("Instance", () => {
  const i = new RandomInstrument();
  assertInstanceOf(i, Instrument);
});

Deno.test("Name", () => {
  const i = new RandomInstrument();
  assertEquals(i.symbol.length, 4);
});

Deno.test("Price", () => {
  const i = new RandomInstrument();
  assertNotEquals(i.price(), 0);
});