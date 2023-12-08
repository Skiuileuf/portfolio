import { Statement, Program, Expression, BinaryExpression, NumericLiteral, Identifier } from "./ast";
import { tokenize, Token, TokenType } from "./lexer";

export default class Parser {

    private tokens: Token[] = [];

    private notEOF(): boolean {
        return this.tokens[0].type != TokenType.EOF;
    }

    private at() {
        return this.tokens[0] as Token;
    }

    private advance() {
        const prev = this.tokens.shift() as Token;
        return prev;
    }

    public produceAST(sourceCode: string): Program {
        this.tokens = tokenize(sourceCode);

        const program: Program = {
            kind: "Program",
            body: [],
        }

        // Parse until end of file
        while (this.notEOF()) {
            program.body.push(this.parseStatement());
        }

        return program;
    }

    private parseStatement(): Statement {
        // skip to parseExpression
        return this.parseExpression();
    }

    private parseExpression(): Expression {
        // skip to parseBinaryExpression
        return this.parsePrimaryExpression();
    }

    private parsePrimaryExpression(): Expression {
        const tk = this.at().type;

        switch (tk) {
            case TokenType.Identifier:
                return { kind: "Identifier", symbol: this.advance().value } as Identifier;
            case TokenType.Number:
                return { kind: "NumericLiteral", value: parseFloat(this.advance().value) } as NumericLiteral;

            default: 
                console.error("Unexpected token found during parsing: " + this.at());
                this.advance();
                return {} as Statement; //Or exit??
        }
    }
}