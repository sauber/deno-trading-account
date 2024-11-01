import { Account } from "./mod.ts";
import { Exchange } from "./src/exchange.ts";

// Pick two instruments to trade
const market = new Exchange();
const instruments = [market.any(), market.any()];

// Open an account
const account = new Account(1000);

// Open positions in each instrument
for ( const instrument of instruments ) {
  const openingPrice: number = market.buy(instrument);
}