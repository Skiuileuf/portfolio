import { Accounts, RequestedData, Transaction } from "./AccountingTypes";
import Scanner from "./Scanner";

export interface ParsingResults {
    accounts: Accounts;
    requestedData: RequestedData[];
    transactions: Transaction[];
}

export default class AccountingLang {
    static hadError: boolean = false;
    static run(script: string): void {
        const scriptScanner = new Scanner(script, ()=>{});
        const tokens = scriptScanner.scanTokens();
    
        for(var token in tokens) {
            console.log(token);
        }
    }
    
    static error(line: number, message: string): void {
        AccountingLang.report(line, "", message);
    }
    
    static report(line: number, where: string, message: string) {
        console.error("[line " + line + "] Error" + where + ": " + message);
    }

}



export function ParseAccountingLang(script: string): ParsingResults {
    const accounts: Accounts = {};
    const requestedData: RequestedData[] = [];
    const transactions: Transaction[] = [];
    const errors: Error[] = [];

    const lines = script.split("\n");
    let currentTransaction: Transaction | null = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineSplit = line.split(" ");

        if (line.startsWith("//") || line === "") continue;
        if (line.startsWith("Initial")) {
            const initialRegex = /Initial\s(\d*?.+?\]?)\s(-?\d*\.?\d*)/i;
            const matches = line.match(initialRegex);
            if (matches === null || matches.length != 3) {
                console.error("Invalid syntax for Initial (on line " + (i + 1) + ")");
                // return;
            } else {
                const accountName = matches[1];
                const amount = parseFloat(matches[2]);
                console.log(accountName, amount);
                accounts[accountName] = amount;
            }
            continue;
        }
        if (line.startsWith("Balance")) {
            const accountName = lineSplit[1];
            // console.log(`|${accountName}|`)
            console.log(accountName + ": " + accounts[accountName]);
            requestedData.push({ type: "balance", accountName, amount: accounts[accountName] });
            // setRequestedData([...requestedData, {type: "balance", accountName, amount: accounts[accountName]}]);
            continue;
        }
        if (line.startsWith("Transaction")) {
            const transactionName = lineSplit[1];
            currentTransaction = { name: transactionName, debit: [], credit: [] };
            // currentTransactionBalance = 0;
            continue;
        }
        if (line.includes("=")) {
            if (currentTransaction == null) {
                console.error("Not inside a transaction (on line " + (i + 1) + ")");
                // return;
            }
            const regex = /(\d*)\s?=\s?(\d*)\s?(-?\d*\.?\d*)/i;
            const matches = line.match(regex);

            if (matches === null || matches.length != 4 || currentTransaction == null) {
                console.error("Invalid syntax for = (on line " + (i + 1) + ")");
                // return;
            } else {
                const debitAccountName = matches[1];
                const creditAccountName = matches[2];
                const amount = parseFloat(matches[3]);
                currentTransaction.debit.push({ accountName: debitAccountName, amount });
                currentTransaction.credit.push({ accountName: creditAccountName, amount });
            }
        }
        if (line.startsWith("Commit")) {
            if (currentTransaction == null) {
                console.error("Not inside a transaction (on line " + (i + 1) + ")");
                // return;
                break;
            }
            for (let j = 0; j < currentTransaction.debit.length; j++) {
                const debit = currentTransaction.debit[j];
                const credit = currentTransaction.credit[j];
                accounts[debit.accountName] = accounts[debit.accountName] + debit.amount;
                accounts[credit.accountName] = accounts[credit.accountName] + credit.amount;
            }
            transactions.push(currentTransaction);
            currentTransaction = null;
            continue;
        }
    }

    return {
        accounts: accounts,
        requestedData: requestedData,
        transactions: transactions
    };
}