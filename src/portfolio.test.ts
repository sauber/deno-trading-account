import {
  assertNotEquals,
  assertEquals,
  assertInstanceOf,
  assertGreater,
  assertLess,
} from "@std/assert";
import { Portfolio } from "./portfolio.ts";
import { RandomInstrument } from "./instrument.ts";

Deno.test("Instance", () => {
  const p = new Portfolio();
  assertInstanceOf(p, Portfolio);
});

Deno.test("Add/remove position", () => {
  const portfolio = new Portfolio();
  const instrument = new RandomInstrument();
  const amount = 100;

  const id: string = portfolio.add(instrument, amount, instrument.price());
  assertEquals(portfolio.length, 1);

  portfolio.remove(id);
  assertEquals(portfolio.length, 0);
});

Deno.test("Amount invested", () => {
  const portfolio = new Portfolio();
  const instrument = new RandomInstrument();
  const amount = 100;

  portfolio.add(instrument, amount, instrument.price());
  portfolio.add(instrument, amount, instrument.price());
  assertEquals(portfolio.invested, 2 * amount);
});

Deno.test("Profit", () => {
  const portfolio = new Portfolio();
  const instrument = new RandomInstrument();
  const amount = 100;

  portfolio.add(instrument, amount, instrument.price());
  portfolio.add(instrument, amount, instrument.price());
  assertNotEquals(portfolio.profit(), 0);
});

Deno.test("Value", () => {
  const portfolio = new Portfolio();
  const instrument = new RandomInstrument();
  const amount = 100;

  portfolio.add(instrument, amount, instrument.price());
  portfolio.add(instrument, amount, instrument.price());
  const value = portfolio.value();
  assertGreater(value, 1.6 * amount);
  assertLess(value, 2.4 * amount);
});
