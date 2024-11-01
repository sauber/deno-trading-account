import { type Transaction, Deposit, Withdraw } from "./transaction.ts";

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

  /** Optionally deposit an amount at account opening */
  constructor(deposit: number = 0, time: Date = new Date()) {
    if (deposit != 0) this.deposit(deposit, time);
  }

  /** Deposit an amount to account */
  public deposit(amount: number, time: Date = new Date()) {
    const transaction = new Deposit(amount);
    const saldo: Saldo = this.saldo;
    saldo.cash += transaction.cash;
    this.journal.push({ transaction, saldo, time });
  }

  /** Deposit an amount to account */
  public withdraw(amount: number, time: Date = new Date()) {
    const transaction = new Withdraw(amount);
    const saldo: Saldo = this.saldo;
    saldo.cash += transaction.cash;
    this.journal.push({ transaction, saldo, time });
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
}
