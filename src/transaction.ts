import type { Instrument } from "./instrument.ts";

/** Abstract class for transaction */
export abstract class Transaction {
  constructor(public readonly text: string, public readonly amount: number) {}
}

/** Deposit transaction */
export class Deposit extends Transaction {
  constructor(amount: number) {
    super("Deposit", amount);
  }
}

/** Withdraw transaction */
export class Withdraw extends Transaction {
  constructor(amount: number) {
    super("Withdraw", amount);
  }
}

/** Open an investment position */
export class Open extends Transaction {
  constructor(amount: number, instrument: Instrument, price: number) {
    const rounded = parseFloat(price.toFixed(4));
    super(`Open ${instrument.symbol}@${rounded}`, amount);
  }
}

/** Close an investment position */
export class Close extends Transaction {
  constructor(amount: number, instrument: Instrument, price: number) {
    const rounded = parseFloat(price.toFixed(4));
    super(`Close ${instrument.symbol}@${rounded}`, amount);
  }
}
