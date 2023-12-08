'use client'


import Parser, { Expression } from "@/lib/AccountingLang/Parser";
import Scanner, { Token } from "@/lib/AccountingLang/Scanner";
import TokenType from "@/lib/AccountingLang/TokenType";
import { useEffect, useState } from "react";

export default function AccountingLangPage() {
    const defaultScript = `Initial 301 100.50
Initial 401 0
Initial 5121 400

Transaction "Achizitie Marfa"
301 = 401 200
Commit

Transaction "Plata Furnizori"
% = 5121 200
401 : 150
4426 : 50
Commit

Balance 301
Balance 401
Balance 5121`;

    const [scanner, setScanner] = useState<Scanner>();
    const [tokens, setTokens] = useState<Token[]>();
    const [parser, setParser] = useState<Parser>();
    const [expressions, setExpressions] = useState<Expression[]>([]);


    useEffect(() => {
        const sc = new Scanner(defaultScript, ()=>{});
        setScanner(sc);
        const tk = sc.scanTokens();
        setTokens(tk);
        const pr = new Parser(tk, () => {});
        setParser(pr);
        const expr = pr.parse();
        setExpressions(expr);
    }, []);

    // const tokens = scriptScanner.scanTokens();

    //separate tokens by line
    // const lines = scriptScanner.scanLines();


    return (

        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {
                expressions?.map((expression, index) => {
                    return (
                        <div key={index} className="bg-orange-400 mt-2">
                            {/* {JSON.stringify(expression)} */}
                            {TokenType[expression.operator]} {expression.left} {expression.right}
                        </div>
                    );
                })

            }
            {
                tokens?.map((token, index) => {
                    return (
                        <div key={index} className="bg-slate-400 mt-2">
                            {/* {JSON.stringify(token)} */}
                            {TokenType[token.type]} {token.lexeme} {token.literal} {token.line}
                        </div>
                    );
                })
            }
            {JSON.stringify(tokens, null, 2)}
        </div>
    );

}