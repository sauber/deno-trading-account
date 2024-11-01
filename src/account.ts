import { Instrument } from "./instrument.ts";
import { Portfolio } from "./portfolio.ts";
import { PositionID } from "./position.ts";
import { type Transaction, Close, Deposit, Open, Withdraw } from "./transaction.ts";

// Cash and invested amount after each transaction
type Saldo = {
  cash: number;
  invested: number;
};

type Entry = {
  transaction: Transaction;
  saldo: Saldo;
  time: Date;
};

type Journal = Array<Entry>;

/** Journal of transactions */
export class Account {
  private readonly journal: Journal = [];
  private readonly portfolio = new Portfolio();

  /** Optionally deposit an amount at account opening */
  constructor(deposit: number = 0, time: Date = new Date()) {
    if (deposit != 0) this.deposit(deposit, time);
  }

  /** Most recent entry in journal */
  private get last(): Entry {
    return this.journal[this.journal.length - 1];
  }

  /** Copy of most recent saldo */
  public get saldo(): Saldo {
    if (this.journal.length < 1) return { cash: 0, invested: 0 };
    return { ...this.last.saldo };
  }

  /** Deposit an amount to account */
  public deposit(amount: number, time: Date = new Date()) {
    const transaction = new Deposit(amount);
    const saldo: Saldo = this.saldo;
    saldo.cash += amount;
    this.journal.push({ transaction, saldo, time });
  }

  /** Deposit an amount to account */
  public withdraw(amount: number, time: Date = new Date()) {
    const transaction = new Withdraw(amount);
    const saldo: Saldo = this.saldo;
    saldo.cash -= amount;
    this.journal.push({ transaction, saldo, time });
  }

  /** Open a position in an instrument */
  public open(
    amount: number,
    instrument: Instrument,
    price: number,
    time: Date = new Date()
  ): PositionID | false {
    // Cannot open unfunded position
    if (amount > this.saldo.cash) return false;

    const transaction = new Open(amount, instrument, price);
    const saldo: Saldo = this.saldo;
    saldo.cash -= amount;
    saldo.invested += amount;
    const id: PositionID = this.portfolio.add(instrument, amount, price, time);
    this.journal.push({ transaction, saldo, time });
    return id;
  }

  /* Close a position */
  public close(id: PositionID, price: number, time: Date = new Date()): boolean {
    const position = this.portfolio.position(id);
    if ( ! position ) return false;
    const amount = position.amount * price / position.price;
    const saldo: Saldo = this.saldo;
    saldo.cash += amount;
    saldo.invested -= position.invested;
    const transaction = new Close(amount, position.instrument, price);
    this.journal.push({transaction, saldo, time});
    return true;
  }
}
