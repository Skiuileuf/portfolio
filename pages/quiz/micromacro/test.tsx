import { MultipleChoiceQuestion } from "@/lib/Quiz/MultipleChoice";
import useLocalStorage from "@/lib/useLocalStorage";
import { useEffect } from "react";

export default function TestPage() {

    function randomProblemID() { return Math.floor(Math.random() * 500); }

    const [setTest, setTestState] = useLocalStorage<MultipleChoiceQuestion[] | null>("testState", null);

    useEffect(() => {
        // Check if test is already in progress
        if (setTest) {
            return;
        }
        
        // Generate question ids
        const questionIDs: number[] = [];
        for (let i = 0; i < 10; i++) {
            questionIDs.push(randomProblemID());
        }

        // Fetch questions
        const fetchQuestions = async () => {
            const questions: MultipleChoiceQuestion[] = [];
            for (let i = 0; i < 10; i++) {
                const response = await fetch(`http://localhost:3000/api/quiz/micromacro/${questionIDs[i]}`);
                const data = await response.json();
                questions.push(data);
            }
            setTestState(questions);
        }

        fetchQuestions();
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold">Test</h1>
        </div>
    )
}