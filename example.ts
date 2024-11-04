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
  if (again.price < position.price) account.add(again, positionSize);
}

// Close any positions in profit
for (const position of account.positions) {
  const value = exchange.sell(position);
  if (value > position.invested) account.remove(position, value);
}

console.log(account.statement);
console.log(account.portfolio.statement);

// Example output:
// [ Transactions ]
// ╔═══════════╤═════════╤════════╤════════╤════════╤══════════╤═════════╗
// ║ Date      │ Action  │ Symbol │ Price  │ Amount │ Invested │ Cash    ║
// ╟───────────┼─────────┼────────┼────────┼────────┼──────────┼─────────╢
// ║ 4.11.2024 │ Deposit │        │        │   2000 │        0 │    2000 ║
// ║ 4.11.2024 │ Open    │ DAQV   │ 466.96 │    500 │      500 │    1500 ║
// ║ 4.11.2024 │ Open    │ YWIF   │  470.2 │    500 │     1000 │    1000 ║
// ║ 4.11.2024 │ Open    │ DAQV   │ 433.74 │    500 │     1500 │     500 ║
// ║ 4.11.2024 │ Open    │ YWIF   │ 462.12 │    500 │     2000 │       0 ║
// ║ 4.11.2024 │ Close   │ DAQV   │ 474.81 │ 508.41 │     1500 │  508.41 ║
// ║ 4.11.2024 │ Close   │ DAQV   │ 463.62 │ 534.45 │     1000 │ 1042.85 ║
// ╚═══════════╧═════════╧════════╧════════╧════════╧══════════╧═════════╝
// [ Portfolio position=2, invested=1000, profit=-99.46, value=900.54 ]
// ╔═══════════╤════════╤════════╤════════╤══════════╤════════╤════════╗
// ║ Date      │ Symbol │ Price  │ Units  │ Invested │ Profit │ Value  ║
// ╟───────────┼────────┼────────┼────────┼──────────┼────────┼────────╢
// ║ 4.11.2024 │ YWIF   │  470.2 │ 1.0634 │      500 │ -41.32 │ 458.68 ║
// ║ 4.11.2024 │ YWIF   │ 462.12 │ 1.0820 │      500 │ -58.14 │ 441.86 ║
// ╚═══════════╧════════╧════════╧════════╧══════════╧════════╧════════╝
