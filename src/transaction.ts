/** Abstract class for transaction */
export abstract class Transaction {
  constructor(
    public readonly text: string,
    public readonly cash: number,
  ) {}
}

/** Deposit transaction */
export class Deposit extends Transaction {
  constructor(public readonly amount: number) {
    super(`Deposit ${amount}`, amount);
  }
}

/** Withdraw transaction */
export class Withdraw extends Transaction {
  constructor(public readonly amount: number) {
    super(`Withdraw ${amount}`, -amount);
  }
}

// export class Buy extends Transaction {
//   private fee: number = 0;
//   private readonly text: string;

//   constructor(
//     date: DateFormat,
//     private readonly amount: number,
//     private readonly investor: Investor,
//   ) {
//     super(date);
//     this.text = `Buy ${amount} of ${investor.UserName}`;
//   }

//   public execute(
//     book: Book,
//     portfolio: Portfolio,
//     exchange: Exchange,
//   ): boolean {
//     const position: Position = exchange.buy(
//       this.investor,
//       this.date,
//       this.amount,
//     );

//     // Is cash available?
//     if ( this.amount > book.cash ) return false;

//     this.fee = this.amount - position.value(this.date);
//     book.add(this);
//     portfolio.add(position);
//     return true;
//   }
// }
