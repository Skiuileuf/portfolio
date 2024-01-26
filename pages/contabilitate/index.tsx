import Link from "next/link";

export default function AccountingIndexPage() {
    return (
        <div>
            <h1>Contabilitate</h1>
            <ul>
                <li><Link href="/contabilitate/conturi">Conturi</Link></li>
                <li><Link href="/contabilitate/word">Word</Link></li>
                {/* <li><Link href="/contabilitate/conturi">Solduri</Link></li>
                <li><Link href="/contabilitate/conturi">Bilant</Link></li>
                <li><Link href="/contabilitate/conturi">Raport</Link></li> */}
            </ul>
        </div>
    )
}