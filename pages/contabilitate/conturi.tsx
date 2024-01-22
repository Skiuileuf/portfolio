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
            <nav className='flex justify-between items-center h-16 bg-white text-black relative shadow-sm
      font-mono font-bold'>
        <div className='flex justify-between items-center'>
          <div className='flex space-x-4'>
            {/* <Image src='/logo.png' width={50} height={50} /> */}
            <h1 className='text-2xl'>Conturi</h1>
          </div>
        </div>
        <div className='flex space-x-4'>
          <input className='border-black'
            placeholder='Cauta cont'
            value={search}
            onChange={(e) => {
                console.log(e.target.value);
                setSearch(e.target.value)}}
          >
          </input>
          <button className='border-black'>Cauta</button>
        </div>
      </nav>
  
        {/* Main content */}
      <h1 className='text-2xl'>Conturi</h1>
      {/* Display table with horizontal rows */}
      <div>
        {
            accounts.filter((e) => {
                if(!e.nume) return false;

                const containsNumber = e.numar.startsWith(search);
                const containsSearch = e.nume.toLowerCase().includes(search.toLowerCase());

                return containsNumber || containsSearch;
            }).map((cont) => (
                <div>
                  <div className="inline-block">{cont.numar}</div>
                  <div className="inline-block">{cont.nume}</div>
                </div>
              ))
        }
      </div>
      {/* <table className='table-auto border-collapse border border-black w-full'>
        <thead>
          <th>Numar</th>
          <th>Nume</th>
        </thead>
        <tbody>
          {
            filterAccounts(accounts, search).map((cont) => (
              <tr>
                <td>{cont.numar}</td>
                <td>{cont.nume}</td>
              </tr>
            ))
          }
        </tbody>
      </table> */}
        </Panel>
    )
}