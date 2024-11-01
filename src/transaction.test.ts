import { assertEquals, assertInstanceOf } from "@std/assert";
import { Close, Deposit, Open, Transaction, Withdraw } from "./transaction.ts";
import { instrument } from "./testdata.ts";

Deno.test("Deposit", () => {
  const amount = 100;
  const deposit = new Deposit(amount);
  assertInstanceOf(deposit, Deposit);
  assertInstanceOf(deposit, Transaction);
  assertEquals(deposit.amount, amount);
});

Deno.test("Withdraw", () => {
  const amount = 100;
  const withdraw = new Withdraw(amount);
  assertInstanceOf(withdraw, Withdraw);
  assertInstanceOf(withdraw, Transaction);
  assertEquals(withdraw.amount, amount);
});

Deno.test("Open", () => {
  const inst = instrument();
  const amount = 100;
  const open = new Open(amount, inst, inst.price());
  assertInstanceOf(open, Open);
  assertInstanceOf(open, Transaction);
  assertEquals(open.amount, amount);
});

Deno.test("Close", () => {
  const inst = instrument();
  const amount = 100;
  const close = new Close(amount, inst, inst.price());
  assertInstanceOf(close, Close);
  assertInstanceOf(close, Transaction);
  assertEquals(close.amount, amount);
});
