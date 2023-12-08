import Panel from "@/components/Panel";
import { useEffect, useState } from "react";
import { Transaction, Accounts, RequestedData, Error } from "@/lib/AccountingLang/AccountingTypes"
import Editor, { useMonaco } from '@monaco-editor/react';
import { ParseAccountingLang } from "@/lib/AccountingLang/AccountingLang";
import Scanner, { Token } from "@/lib/AccountingLang/Scanner";
import TokenType from "@/lib/AccountingLang/TokenType";
import { PanelGroup, PanelResizeHandle, Panel as ResizeablePanel } from "react-resizable-panels";
import Parser, { Expression } from "@/lib/AccountingLang/Parser";

interface AccountsList {
    Id: number;
    Nume: string;
    IncadrareCont: string;
    CategorieBilant: string;
    SubcategorieBilant: string;
    Intrari: string;
    Bilant: string;
}

const defaultScript = `INITIAL 301 100
INITIAL 401 0
INITIAL 5121 400

TRANSACTION "Achizitie Marfa"
301 = 401 200
COMMIT

TRANSACTION "Plata Furnizori"
401 = 5121 200 @
COMMIT

BALANCE 301
BALANCE 401
BALANCE 5121`;

export default function AccountingLangPage() {
    const [script, setScript] = useState(defaultScript);

    const [accounts, setAccounts] = useState<Accounts>({});
    const [requestedData, setRequestedData] = useState<RequestedData[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const [errors, setErrors] = useState<Error[]>([]);

    const [accountNames, setAccountNames] = useState<AccountsList[]>([]);

    const [tokens, setTokens] = useState<Token[]>([]);
    const [expressions, setExpressions] = useState<Expression[]>([]);

    const monaco = useMonaco();

    useEffect(() => {
        fetch("http://localhost:3000/files/accounts.json")
            .then((res) => res.json())
            .then((data: AccountsList[]) => {
                setAccountNames(data);
            });
    }, []);

    useEffect(() => {
        if (monaco) {
            monaco.languages.register({ id: 'accountinglang' });

            const keywords = ['Initial', 'Balance', 'Transaction', 'Commit', 'Evaluate'];
            const operators = ['=', '%'];
            monaco.languages.setMonarchTokensProvider('accountinglang', {
                ignoreCase: true,
                defaultToken: 'invalid',
                keywords: keywords,
                operators: operators,
                tokenizer: {
                    root: [
                        [/@?[a-zA-Z_][\w]*/i, {
                            cases: {
                                '@keywords': 'keyword',
                                '@default': 'identifier'
                            }
                        }],
                        [/-?\d+(\.\d*)?/, 'number'],
                        [/=/, 'operator'],
                        [/\/\/.*$/, 'comment'],
                        // [/\/\*/, { token: 'comment.quote', next: '@comment' }],
                        // [/[{}()\[\]]/, '@brackets'],
                        // [/[;,.]/, 'delimiter'],
                        // [/"([^"\\]|\\.)*$/, 'string.invalid'],
                        [/"/, 'string', 'string'],
                    ],
                    string: [
                        [/[^\\"]+/, 'string'],
                        [/"/, 'string', '@pop'],
                    ],
                    
                }
            });

            monaco.languages.setLanguageConfiguration('accountinglang', {
                comments: {
                    lineComment: '//',
                    // blockComment: ['/*', '*/'],
                },
                
            });

            // monaco.languages.registerCompletionItemProvider('accountinglang', {
            //     provideCompletionItems: (model, position) => {

            //         const info = model.getWordUntilPosition(position);
            //         const suggestions = [...keywords.map((keyword) => {

            //             return {
            //                 label: keyword,
            //                 kind: monaco.languages.CompletionItemKind.Keyword,
            //                 insertText: keyword,
            //                 range: {
            //                     startLineNumber: position.lineNumber,
            //                     endLineNumber:  info?.startColumn ?? position.column,
            //                     startColumn:   model.getLineCount(),
            //                     endColumn: model.getLineMaxColumn(model.getLineCount())
            //                 }
            //             }})];

            //         return { suggestions: suggestions};
            //     }
            // });

            // monaco.languages.registerHoverProvider('accountinglang', {
            //     provideHover: function (model, position) {
            //         const word = model.getWordAtPosition(position);
            //         console.log(word);
            //         return {
            //             range: new monaco.Range(1, 1, model.getLineCount(), model.getLineMaxColumn(model.getLineCount())),
            //             contents: [
            //                 { value: '**SOURCE**' },
            //                 { value: '```' },
            //                 { value: 'function hello(): string' },
            //                 { value: '```' },
            //             ]
            //         };
            //     }
            // });

        }
    }, [monaco]);

    useEffect(() => {
        if(monaco) {
            let markers: any = [];
            if(errors.length > 0) {
                errors.forEach((error) => {
                    markers.push(
                        {
                            startLineNumber: error.line,
                            endLineNumber: error.line,
                            startColumn: 1,
                            endColumn: 99,
                            message: error.message,
                            severity: monaco.MarkerSeverity.Error
                        }
                    );
                });
                
                // monaco.editor.setModelMarkers(monaco.editor.getModels()[0], "owner", markers);
                monaco.editor.setModelMarkers(monaco.editor.getModels()[0], "accountinglang", [ ...markers ]);
            } else {
                //no errors
                monaco.editor.removeAllMarkers("accountinglang");
            }
        }
    }, [errors]);

    function handleChange(value: string | undefined) {
        setScript(() => value!);
        setErrors(() => []);

        const onError = (error: Error) => {
            setErrors(e => [...e, error]);
        }

        const scanner = new Scanner(value!, onError);
        setTokens(() => scanner.scanTokens());

        const parser = new Parser(scanner.scanTokens(), onError);
        setExpressions(() => parser.parse());
    }

    return (
        <PanelGroup direction={"horizontal"}>
            <ResizeablePanel id="editor">
                <Editor
                    height="100vh"
                    theme="vs-dark"
                    defaultLanguage="accountinglang"
                    defaultValue={defaultScript}
                    language="accountinglang"
                    onChange={e => handleChange(e)}
                    value={script}
                />
            </ResizeablePanel>
            <PanelResizeHandle className="w-2 bg-blue-800" />
            <ResizeablePanel id="data">
                <Panel className="container mx-auto p-4 h-[100vh] overflow-scroll">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold">Accounting Language</h1>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                            onClick={() => {
                                const results = ParseAccountingLang(script);
                                setAccounts(e => results.accounts);
                                setRequestedData(e => results.requestedData);
                                setTransactions(e => results.transactions);

                            }}>Run</button>
                            <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                            onClick={() => {
                                // setErrors(["aaa"]);

                            }}>SETERR</button>
                                                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                            onClick={() => {
                                setErrors([]);

                            }}>CLERR</button>

                        <div className="grid grid-cols-1 gap-4">
                            <div key={1}>
                                <h1>Accounts</h1>
                                <div className="">
                                    {Object.entries(accounts).map(([accountName, amount], index) => {
                                        return (
                                            <div key={index} className="flex justify-between">
                                                <div>{accountName} ({accountNames.find((lst) => lst.Id.toString() === accountName)?.Nume})</div>
                                                <div>{amount}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div key={2}>
                                <h1>Requested Data</h1>
                                {
                                    requestedData.map((data, index) => {
                                        return (
                                            <div key={index} className="flex justify-between">
                                                <div>{data.accountName} ({accountNames.find((lst) => lst.Id.toString() === data.accountName)?.Nume})</div>
                                                <div>{data.type}</div>
                                                <div>{data.amount}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div key={3}>
                                <h1>Transactions</h1>
                                {
                                    transactions.map((transaction, index) => {
                                        return (
                                            <div key={index} className="flex justify-between">
                                                <div>{transaction.name}</div>
                                                <div>{transaction.debit.map((rec) => { return (<div>{rec.accountName}: {rec.amount}</div>) })}</div>
                                                <div>{transaction.credit.map((rec) => { return (<div>{rec.accountName}: {rec.amount}</div>) })}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div>
                            <h1>Errors</h1>
                            <div className="">
                                {
                                    errors.map((error, index) => {
                                        return (
                                            <div key={index} className="bg-red-400 mt-2">
                                                {JSON.stringify(error)}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div>
                            <h1>Expressions</h1>
                            <div className="">
                                {
                                    expressions.map((expression, index) => {
                                        return (
                                            <div key={index} className="bg-green-400 mt-2">
                                                {typeof expression} {expression.operator} {expression.left?.lexeme} {expression.right?.lexeme}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div>
                            <h1>Tokens</h1>
                            <div className="">
                                {
                                    tokens.map((token, index) => {
                                        return (
                                            <div key={index} className="bg-slate-400 mt-2">
                                                {TokenType[token.type]} {token.lexeme} {token.literal} {token.line}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </Panel>
            </ResizeablePanel>
        </PanelGroup>

    )
}