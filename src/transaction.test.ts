import { assertEquals, assertInstanceOf } from "@std/assert";
import { Deposit, Withdraw } from "./transaction.ts";

Deno.test("Deposit", () => {
  const amount = 100;
  const deposit = new Deposit(amount);
  assertInstanceOf(deposit, Deposit);
  assertEquals(deposit.cash, amount);
});

Deno.test("Withdraw", () => {
  const amount = 100;
  const withdraw = new Withdraw(amount);
  assertInstanceOf(withdraw, Withdraw);
  assertEquals(withdraw.cash, -amount);
});
