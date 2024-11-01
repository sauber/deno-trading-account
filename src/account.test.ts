import { assertEquals, assertInstanceOf } from "@std/assert";
import { Account } from "./account.ts";

Deno.test("Instance", () => {
  const account = new Account();
  assertInstanceOf(account, Account);
});

Deno.test("Open with amount", () => {
  const cash = 1000;
  const account = new Account(cash);
  assertEquals(account.saldo.cash, cash);
});

Deno.test("Deposits", () => {
  const amount = 100;
  const account = new Account();
  account.deposit(amount);
  assertEquals(account.saldo.cash, amount);
  account.deposit(amount);
  assertEquals(account.saldo.cash, 2 * amount);
});

Deno.test("Withdrawals", () => {
  const open = 2000;
  const amount = 100;
  const account = new Account(open);
  account.withdraw(amount);
  assertEquals(account.saldo.cash, open - amount);
  account.withdraw(amount);
  assertEquals(account.saldo.cash, open - 2 * amount);
});
