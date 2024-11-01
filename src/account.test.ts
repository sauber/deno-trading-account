import { assertEquals, assertInstanceOf, assertNotEquals } from "@std/assert";
import { Account } from "./account.ts";
import { instrument } from "./testdata.ts";
import { RandomInstrument } from "./instrument.ts";
import { PositionID } from "./position.ts";

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

Deno.test("Open", () => {
  const start = 2000;
  const amount = 100;
  const account = new Account(start);
  const inst: RandomInstrument = instrument();
  const id: PositionID|false = account.open(amount, inst, inst.price());
  assertNotEquals(id, "");
  assertEquals(account.saldo.cash, start - amount);
});

Deno.test("Open exceeds funds", () => {
  const start = 2000;
  const amount = 2001;
  const account = new Account(start);
  const inst: RandomInstrument = instrument();
  const id: PositionID|false = account.open(amount, inst, inst.price());
  assertEquals(id, false);
  assertEquals(account.saldo.cash, start);
});

Deno.test("Close", () => {
  const start = 2000;
  const amount = 100;
  const account = new Account(start);
  const inst: RandomInstrument = instrument();
  const opening: number = inst.price();
  const id = account.open(amount, inst, opening) as PositionID;
  account.close(id, opening);
  assertEquals(account.saldo.cash, start);
});
