import Parser from "@/lib/ContaLingua/parser"
import { useEffect, useState } from "react"

export default function ContaLinguaREPL() {

    function repl() {
        const parser = new Parser()
        
        while(true) {
            const input = prompt("ContaLingua > ")
            if(!input || input.includes("exit")) {
                break
            }

            const program = parser.produceAST(input)
            console.log(program)
        }
    }

    const [code, setCode] = useState(`let x = 45 * ( 4 / 3)`)
    useEffect(() => {
        // repl()
    }, [])

    return (
        <div>
            //https://www.youtube.com/watch?v=aAvL2BTHf60&list=PL_2VhOvlMk4UHGqYCLWc6GO8FaPl8fQTh&index=3
            <h1>ContaLingua REPL</h1>
            <textarea value={code} onChange={e => setCode(e.target.value)}></textarea>
            <button onClick={() => repl()}>Run</button>
        </div>
    )
}