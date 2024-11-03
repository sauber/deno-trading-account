import { Account, type Position, Exchange } from "./mod.ts";

// Pick two instruments to trade
const exchange = new Exchange();
const instruments = [exchange.any(), exchange.any()];

// Open an account
const account = new Account(2000);
const positionSize = 500;

// Open positions in each instrument
for (const instrument of instruments) {
  const position: Position = exchange.buy(instrument, positionSize);
  account.add(position, positionSize);
}

// If any positions are cheaper, invest more in same
for (const position of account.positions) {
  const again = exchange.buy(position.instrument, positionSize);
  if ( again.price < position.price ) account.add(again, positionSize);
}

// Close any positions in profit
for (const position of account.positions) {
  const value = exchange.sell(position);
  const profit = value - position.invested;
  if (profit > 0) account.remove(position, value);
}

console.log(account.statement);
