
export enum TokenType {
    Number,
    Identifier,
    Equals,
    OpenParen, CloseParen,
    BinaryOperator,
    Let,

    EOF,
}

const KEYWORDS: Record<string, TokenType> = {
    "let": TokenType.Let,
};


export interface Token {
    value: string;
    type: TokenType;
}

function token(value = "", type: TokenType): Token {
    return { value, type };
}

function isAlpha (src: string): boolean {
    return src.toUpperCase() != src.toLowerCase(); // FIXME
}

function isDigit (src: string): boolean { // FIXME
    const c = src.charCodeAt(0);
    const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
    return c >= bounds[0] && c <= bounds[1]; 
}

function isSkippable (str: string): boolean {
    return str == ' ' || str == '\t' || str == '\n';
}

export function tokenize(sourceCode: string): Token[] {
    const tokens = new Array<Token>();
    const src = sourceCode.split('');

    // Build each token until end of file
    while(src.length > 0) { 
        if (src[0] == '(' )
        {
            tokens.push(token(src.shift(), TokenType.OpenParen));
        } else if (src[0] == ')') {
            tokens.push(token(src.shift(), TokenType.CloseParen));
        } else if (src[0] == '+' || src[0] == '-' || src[0] == '*' || src[0] == '/') {
            tokens.push(token(src.shift(), TokenType.BinaryOperator));
        } else if (src[0] == '=') {
            tokens.push(token(src.shift(), TokenType.Equals));
        } else {
            // Handle multi-character tokens

            // Build number token
            if(isDigit(src[0])) {
                let num = "";
                while (src.length > 0 && isDigit(src[0])) {
                    num += src.shift();
                }

                tokens.push(token(num, TokenType.Number));
            } else if (isAlpha(src[0])) {
                let ident = ""; 
                while (src.length > 0 && isAlpha(src[0])) {
                    ident += src.shift();
                }

                // Check for reserved keywords
                const reserved = KEYWORDS[ident];
                if (reserved == undefined) {
                    tokens.push(token(ident, TokenType.Identifier));
                } else {
                    tokens.push(token(ident, reserved));
                }

            } else if (isSkippable(src[0])) {
                src.shift();
            } else {
                console.log(`Unrecognized char in source: '${src[0]}'`);
                break;
            }
        }
    }

    tokens.push(token("EndOfFile", TokenType.EOF));
    return tokens;
}