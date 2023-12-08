import AccountingLang from "./AccountingLang";
import { Error } from "./AccountingTypes";
import TokenType from "./TokenType";

export class Token {
    type: TokenType;
    lexeme: string;
    literal: any;
    line: number;

    constructor(type: TokenType, lexeme: string, literal: any, line: number) {
        this.type = type;
        this.lexeme = lexeme;
        this.literal = literal;
        this.line = line;
    }
    
    toString(): string {
        return this.type + " " + this.lexeme + " " + this.literal;
    }
}

class Scanner {
    source: string;
    tokens: Token[] = [];

    start: number = 0;
    current: number = 0;
    line: number = 1;

    keywords: { [key: string]: TokenType } = {
        "initial": TokenType.INITIAL,
        "balance": TokenType.BALANCE,
        "transaction": TokenType.TRANSACTION,
        "commit": TokenType.COMMIT,
        "evaluate": TokenType.EVALUATE,
    };

    onError: (error: Error) => void;

    constructor(source: string, onError: (error: Error) => void) {
        this.source = source;
        this.onError = onError;
    }

    scanTokens(): Token[] {
        while (!this.isAtEnd()) {

            this.start = this.current;
            this.scanToken();
        }

        this.tokens.push(new Token(TokenType.EOF, "", null, this.line));
        return this.tokens;
    }

    private isAtEnd(): boolean {
        return this.current >= this.source.length;
    }

    private scanToken(): void {
        const c = this.advance();
        switch (c) {
            case "%": this.addToken(TokenType.PERCENT); break;
            case "=": this.addToken(TokenType.EQUAL); break;
            case "-": this.addToken(TokenType.MINUS); break;
            case ":": this.addToken(TokenType.COLON); break;
            case "/": {
                if (this.match("/")) {
                    while (this.peek() != "\n" && !this.isAtEnd()) this.advance();
                } else {
                    // this.addToken(tokenType.SLASH);
                    // AccountingLang.error(this.line, "Unexpected / .");
                    this.onError( {message:"[line " + this.line + "] Error: Unexpected / .", line: this.line} );
                }
                break;
            }
            case " ": case "\r": case "\t": break; // Ignore whitespace
            case "\n": this.line++; break;
            case '"': this.string(); break;
            default:
                {
                    if (this.isDigit(c)) {
                        this.number();
                    } else if (this.isAlpha(c)) {
                        this.identifier();
                    } else {
                        // AccountingLang.error(this.line, "Unexpected character.");
                        this.onError( {message:"[line " + this.line + `] Error: Unexpected character ${c}.`, line: this.line});
                    }
                };
        }
    }

    private advance(): string {
        this.current++;
        return this.source.charAt(this.current - 1);
    }

    private addToken(type: TokenType, literal: any = null): void {
        const text = this.source.substring(this.start, this.current);
        this.tokens.push(new Token(type, text, literal, this.line));
    }

    private match(expected: string): boolean {
        if (this.isAtEnd()) return false;
        if (this.source.charAt(this.current) != expected) return false;

        this.current++;
        return true;
    }

    private peek(): string {
        if (this.isAtEnd()) return "\0";
        return this.source.charAt(this.current);
    }

    private string(): void {
        while (this.peek() != '"' && !this.isAtEnd()) {
            if (this.peek() == "\n") this.line++;
            this.advance();
        }

        if (this.isAtEnd()) {
            this.onError( {message:"[line " + this.line + "] Error: Unterminated string.", line: this.line} );
            // AccountingLang.error(this.line, "Unterminated string.");
            return;
        }

        this.advance();

        const value = this.source.substring(this.start + 1, this.current - 1);
        this.addToken(TokenType.STRING, value);
    }

    private isDigit(c: string): boolean {
        return c >= "0" && c <= "9";
    }

    private number(): void {
        while (this.isDigit(this.peek())) this.advance();

        if (this.peek() == "." && this.isDigit(this.peekNext())) {
            this.advance();
            while (this.isDigit(this.peek())) this.advance();
        }

        this.addToken(TokenType.NUMBER, parseFloat(this.source.substring(this.start, this.current)));
    }

    private peekNext(): string {
        if (this.current + 1 >= this.source.length) return "\0";
        return this.source.charAt(this.current + 1);
    }

    private isAlpha(c: string): boolean {
        return (c >= "a" && c <= "z") ||
            (c >= "A" && c <= "Z") ||
            c == "_";
    }

    private isAlphaNumeric(c: string): boolean {
        return this.isAlpha(c) || this.isDigit(c);
    }

    private identifier(): void {
        while (this.isAlphaNumeric(this.peek())) this.advance();

        const text = this.source.substring(this.start, this.current);
        let type = this.keywords[text.toLowerCase()];
        if (type == null) type = TokenType.IDENTIFIER;
        this.addToken(type);
    }

}

export default Scanner;

