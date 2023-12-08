import { Token } from "./Scanner";
import TokenType from "./TokenType";
import { Error } from "./AccountingTypes";

export interface Expression {
    operator: TokenType;
    left: any;
    right: any;
}

export interface ExprInitial extends Expression {
    //INITIAL 301 1000
    operator: TokenType.INITIAL;
    left: string;
    right: number;
}

export interface ExprBalance extends Expression {
    //BALANCE 301
    operator: TokenType.BALANCE;
    left: string;
}

export interface ExprTransaction extends Expression {
    //TRANSACTION "T1"
    operator: TokenType.TRANSACTION;
    left: string;
}

export interface ExprDebitCredit extends Expression {
    //301 = 401 200
    //301 = % 200
    //301 : 200
    operator: TokenType.EQUAL;
    left: string | number;
    right: string;
}

export default class Parser {
    tokens: Token[];
    current: number = 0;
    onError: (error: Error) => void;
    constructor(tokens: Token[], onError: (error: Error) => void) {
        this.tokens = tokens;
        this.onError = onError;
    }

    parse(): Expression[] {
        const expressions: Expression[] = [];
        // console.log(this.peek());

        // var isTransaction = false;

        while (!this.isAtEnd()) {
            if(this.peek().type === TokenType.INITIAL) {
                this.advance();
                expressions.push(this.initialDeclaration());
            } else if (this.peek().type === TokenType.BALANCE) {
                this.advance();
                expressions.push(this.balanceDeclaration());
            } else if (this.peek().type === TokenType.TRANSACTION) {
                this.advance();
                // if(isTransaction) this.error("Cannot have nested transactions.");
                expressions.push(this.transactionDeclaration());
            } else if (this.peek().type === TokenType.NUMBER) {
                // this.advance();
                expressions.push(this.debitCreditDeclaration());
            } else if (this.peek().type === TokenType.COMMIT) {
                this.advance();
                expressions.push({ operator: TokenType.COMMIT, left: null, right: null });
            }
            else {
                this.error("Unknown token " + this.peek().lexeme + " on line " + this.peek().line + ".");
                this.advance();
            }
        }
        
        return expressions;
    }

    private initialDeclaration(): ExprInitial {
        const accountName = this.consume(TokenType.NUMBER, "Expect account name.");
        const amount = this.consume(TokenType.NUMBER, "Expect amount.");
        // console.log(accountName, amount);
        return { operator: TokenType.INITIAL, left: accountName, right: Number.parseFloat(amount) };
    }

    private balanceDeclaration(): ExprBalance {
        const accountName = this.consume(TokenType.NUMBER, "Expect account name.");
        // console.log(accountName);
        return { operator: TokenType.BALANCE, left: accountName, right: null }
    }

    private transactionDeclaration(): Expression {
        const transactionName = this.consume(TokenType.STRING, "Expect transaction name.");
        // console.log(transactionName);
        return { operator: TokenType.TRANSACTION, left: transactionName, right: null }
    }

    private debitCreditDeclaration(): Expression {
        var debit = this.advance();
        if( (debit.type !== TokenType.PERCENT) && (debit.type !== TokenType.NUMBER)) {
            this.error("Expect debit account or % sign.");
        }
        

        this.consume(TokenType.EQUAL, "Expect 'to'.");
        
        if(debit.type === TokenType.NUMBER) {
            //301 = 401 200
            //301 = % 200
            //301 : 200

        } else if (debit.type === TokenType.PERCENT) {
            // % = 401 200
        } else {
            this.error("Expect debit account or % sign. INVALID SYNTAX");
        }
        const credit = this.consume(TokenType.NUMBER, "Expect credit account.");

        let amount = null;
        if(debit.type === TokenType.NUMBER) {
            amount = this.consume(TokenType.NUMBER, "Expect amount.");
        }

        // console.log(debit, credit, amount);

        return { operator: TokenType.EQUAL, left: debit.lexeme , right: credit };
    }

    private consume(type: TokenType, message: string): string {
        if (this.check(type)) return this.advance().lexeme;

        this.error(message);
        return "";
    }

    private error(message: string): void {
        console.error(message);
        this.onError( {message: message, line: this.peek().line} );
    }

    private match(...types: TokenType[]): boolean {
        for (const type of types) {
            if (this.check(type)) {
                this.advance();
                return true;
            }
        }

        return false;
    }

    private check(type: TokenType): boolean {
        if (this.isAtEnd()) return false;
        return this.peek()?.type === type;
    }

    private advance(): Token {
        if (!this.isAtEnd()) this.current++;
        return this.previous();
    }

    private isAtEnd(): boolean {
        return this.peek()?.type === TokenType.EOF;
    }

    private peek(): Token {
        return this.tokens[this.current];
    }

    private previous(): Token {
        return this.tokens[this.current - 1];
    }
}