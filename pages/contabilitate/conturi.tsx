import Panel from "@/components/Panel"
import Highlighted from "@/components/conturi/Highlighted";
import { NormalizeUnicodeString } from "@/lib/normalize";
import { useEffect, useState } from "react";

interface Cont {
    numar: string;
    nume: string;
}

export default function AccountsPage() {
    const [accounts, setAccounts] = useState<Cont[]>([]);

    useEffect(() => {
        fetch('/api/contabilitate/1802')
            .then(res => res.json())
            .then(data => setAccounts(data))
    }, []);

    const [search, setSearch] = useState('');

    return (
        <>
            <header className="bg-white fixed top-0 w-full shadow-md">
                <nav className="container mx-auto px-6 py-3">
                    <div className="flex justify-between items-center">
                        <a href="#" className="text-2xl font-bold text-gray-800">Conturi</a>
                        <div className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                                <input 
                                type="search" 
                                placeholder="Cauta conturi" 
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-600" 
                                value={search}
                                onChange={(e) => {
                                    // console.log(e.target.value);
                                    setSearch(e.target.value)
                                }}
                                />
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <Panel className="mt-16">
                {/* Display table with horizontal rows */}
                <div className="container mx-auto">
                    {
                        accounts.filter((e) => {
                            if (!e.nume) return false;

                            const containsNumber = e.numar.startsWith(search);

                            const normalized = NormalizeUnicodeString(e.nume)
                            const containsSearch = normalized.toLowerCase().includes(search.toLowerCase());

                            return containsNumber || containsSearch;
                        }).map((cont) => {

                            const isCategory = cont.numar.length <= 2;

                            const accountType = cont.nume.search(/\(.*\)/g)

                            return (
                                <div className={`${isCategory && "font-bold"}`}>
                                    <div className={`inline-block w-12`}>{cont.numar}</div>
                                    <div className="inline-block">{cont.nume.replace(/\*[0-9]*\)/g, "")}</div>
                                    {/* <Highlighted text={cont.nume} highlight={search} /> */}
                                    {/* <div className="inline-block">{accountType}</div> */}
                                </div>
                            )
                        })
                    }
                </div>
            </Panel>
        </>

    )
}