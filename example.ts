import { Account, type Position, Exchange } from "./mod.ts";

// Pick two instruments to trade
const market = new Exchange();
const instruments = [market.any(), market.any()];

// Open an account
const account = new Account(2000);
const positionSize = 500;

// Open positions in each instrument
for (const instrument of instruments) {
  const position: Position = market.buy(instrument, positionSize);
  account.add(position, positionSize);
}

// If any positions are in loss, invest more in same
for (const position of account.positions) {
  if (position.profit() < 0) {
    const position2: Position = market.buy(position.instrument, positionSize);
    account.add(position2, positionSize);
  }
}

console.log(account.positions);

// If any positions are in profit, close them
for (const position of account.positions)
  if (position.profit() > 0) account.remove(position, position.value());

console.log(account.positions);
console.log(account.balance);