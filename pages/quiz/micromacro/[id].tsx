import Panel from "@/components/Panel";
import QuestionPanel from "@/components/quiz/QuestionPanel";
import { MultipleChoiceQuestion } from "@/lib/Quiz/MultipleChoice";
import { use, useEffect, useState } from "react";

export default function AllQuestions() {
    const [questions, setQuestions] = useState<MultipleChoiceQuestion[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<MultipleChoiceQuestion>(questions[0]);

    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        // Start a timer to track time elapsed
        const timer = setInterval(() => {
            setTimeElapsed((prevTime) => prevTime + 1);
        }, 1000);

        // Clean up the timer on component unmount
        return () => clearInterval(timer);
    }, []);

    // selectedAnswer == answer.key ? "bg-blue-500 text-white" : ""
    useEffect(() => {
        const fetchQuestions = async () => {
            fetch("http://localhost:3000/api/quiz/micromacro")
                .then(response => response.json())
                .then(data => setQuestions(data));
        }

        fetchQuestions();
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            setCurrentQuestion(questions[132]);
        }
    }, [questions]);


    if(!currentQuestion) {
        return <div>
            <h1 className="text-4xl font-bold">Toate intrebarile</h1>
            <ol className="m-8">
                {questions.map((question, index) => (
                    <li key={index}>{question.id}. {question.prompt}</li>
                ))}
            </ol>
        </div>;
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="container mx-auto flex">
                <div className="flex-1">
                    <QuestionPanel question={currentQuestion} />
                </div>
                <div className="w-1/4 ml-4">
                    <Panel>
                        <h2 className="text-2xl font-bold mb-2">Statistici Test</h2>
                        {/* Display current questions and answered count */}
                        {/* <p>Intrebari: {totalQuestions}</p>
                        <p>Raspunse: {answeredQuestions}</p> */}
                        <p>Intrebari: {10}</p>
                        <p>Raspunse: {5}</p>

                    </Panel>
                </div>
            </div>
            <div className="fixed top-0 right-0 left-0 bg-gray-800 text-white p-2">
                <p className="text-center">Timp trecut: {timeElapsed} sec</p>
            </div>
        </div>
    );
}