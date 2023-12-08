import Panel from "@/components/Panel";
import { MultipleChoiceQuestion } from "@/lib/Quiz/MultipleChoice";
import { useEffect, useState } from "react";

export default function AllQuestions() {
    const [questions, setQuestions] = useState<MultipleChoiceQuestion[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/quiz/micromacro")
            .then(response => response.json())
            .then(data => setQuestions(data));
    }, []);

    function hideOverflowText(text: string, maxLen: number = 50) {
        if (text.length > maxLen) {
            return text.substr(0, maxLen) + "...";
        }
        return text;
    }

    return (
        <div className="container mx-auto">
        <Panel>
            <h1 className="text-4xl font-bold">Toate intrebarile</h1>
            <ol className="m-8">
                {questions.map((question, index) => (
                    <li key={index}>{question.id}. {hideOverflowText(question.prompt)}</li>
                ))}
            </ol>
        </Panel>
        </div>
    )
}