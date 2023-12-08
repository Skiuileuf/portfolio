import Panel from "@/components/Panel";
import Link from "next/link";

export default function QuizMicroMacroIndex() {
    function getLinkToRandomProblem() {
        return `/quiz/micromacro/${Math.floor(Math.random() * 500)}`;
    }

    return (
        <div className="container mx-auto">
        <Panel>
            <h1 className="text-4xl font-bold">Intrebari MicroMacro</h1>
            <h2 className="text-2xl font-normal"><Link href="/quiz/micromacro/all">Vreau sa vad toate intrebarile</Link></h2>
            <h2 className="text-2xl font-normal"><Link href={getLinkToRandomProblem()}>Intrebare aleatorie</Link></h2>
            <h2 className="text-2xl font-normal">Vreau sa rezolv [numar] intrebari din categoria [categorie]</h2>
            <Link href="/quiz/micromacro/test">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Incepe testul
                </button>
            </Link>
        </Panel>
        </div>
    )
}