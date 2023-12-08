export interface Record {
    accountName: string;
    amount: number;
}

export interface Transaction {
    name: string;
    debit: Record[];
    credit: Record[];
}

export interface Accounts {
    [key: string]: number;
}

export interface RequestedData {
    type: "initial" | "debit" | "credit" | "balance";
    accountName: string;
    amount?: number;
}

export interface Error {
    line: number;
    message: string;
}