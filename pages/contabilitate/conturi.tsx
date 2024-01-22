import Panel from "@/components/Panel"
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
        <Panel title="Conturi">
            <nav className='flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono font-bold'>
                <div className='flex justify-between items-center'>
                    <div className='flex space-x-4'>
                        <h1 className='text-2xl'>Conturi</h1>
                    </div>
                </div>
                <div className='flex space-x-4'>
                    <input className='border-black'
                        placeholder='Cauta cont'
                        value={search}
                        onChange={(e) => {
                            console.log(e.target.value);
                            setSearch(e.target.value)
                        }}
                    >
                    </input>
                    <button className='border-black'>Cauta</button>
                </div>
            </nav>

            {/* Display table with horizontal rows */}
            <div className="container mx-auto">
                {
                    accounts.filter((e) => {
                        if (!e.nume) return false;

                        const containsNumber = e.numar.startsWith(search);

                        const normalized = e.nume.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        const containsSearch = normalized.toLowerCase().includes(search.toLowerCase());

                        return containsNumber || containsSearch;
                    }).map((cont) => {

                        const isCategory = cont.numar.length <= 2;
                        
                        const accountType = cont.nume.search(/\(.*\)/g)

                        return (
                            <div className={`${isCategory && "font-bold"}`}>
                                <div className={`inline-block w-10`}>{cont.numar}</div>
                                <div className="inline-block">{cont.nume}</div>
                                {/* <div className="inline-block">{accountType}</div> */}
                            </div>
                        )
                    })
                }
            </div>
        </Panel>
    )
}