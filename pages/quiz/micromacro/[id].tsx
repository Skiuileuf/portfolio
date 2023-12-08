import Panel from "@/components/Panel";
import { MultipleChoiceQuestion } from "@/lib/Quiz/MultipleChoice";
import { use, useEffect, useState } from "react";

export default function AllQuestions() {
    const [questions, setQuestions] = useState<MultipleChoiceQuestion[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<MultipleChoiceQuestion>(questions[0]);

    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [displayCorrectAnswer, setDisplayCorrectAnswer] = useState<boolean>(false);

    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        // Start a timer to track time elapsed
        const timer = setInterval(() => {
            setTimeElapsed((prevTime) => prevTime + 1);
        }, 1000);

        // Clean up the timer on component unmount
        return () => clearInterval(timer);
    }, []);


    function getColorForAnswer(key: string, selAns: string = selectedAnswer, dsCorrAns: boolean = displayCorrectAnswer) {
        if (dsCorrAns) {
            if (key == selAns && key != currentQuestion.correctAnswer) {
                return "bg-red-500 text-white";
            } else if (key == currentQuestion.correctAnswer) {
                return "bg-green-500 text-white";
            }
        } else {
            if (key == selAns) {
                return "bg-blue-500 text-white";
            }
        }
        return "bg-gray-300 text-black";
    }

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
                    <Panel>
                        <h1 className="text-4xl font-bold">Intrebarea {currentQuestion.id}</h1>
                        <h2 className="text-2xl mb-2">{currentQuestion.prompt}</h2>
                        <div>
                            {currentQuestion.answers.map((answer, index) => (
                                <div
                                    key={index}
                                    className={`mb-2 p-2 border border-gray-300 rounded ${getColorForAnswer(
                                        answer.key
                                    )}`}
                                    onClick={() => {
                                        if (displayCorrectAnswer) return;
                                        setSelectedAnswer(answer.key);
                                    }}
                                >
                                    <input
                                        type="radio"
                                        id={answer.key}
                                        name="answer"
                                        value={answer.key}
                                        className="sr-only"
                                    />
                                    <label htmlFor={answer.key} className="cursor-pointer flex items-center">
                                        {answer.answer}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4">
                            <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
                                Raspund mai tarziu
                            </button>
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={() => {
                                    setDisplayCorrectAnswer(true);
                                }}
                            >
                                Trimite raspunsul
                            </button>
                        </div>
                    </Panel>
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

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="container mx-auto">
                <Panel>
                    <h1 className="text-4xl font-bold">Intrebarea {currentQuestion.id}</h1>
                    <h2 className="text-2xl mb-2">{currentQuestion.prompt}</h2>
                    <div>
                        {currentQuestion.answers.map((answer, index) => (
                            <div 
                                key={index} 
                                className={`mb-2 p-2 border border-gray-300 rounded ${getColorForAnswer(answer.key)}`}
                                onClick={() => {
                                    if(displayCorrectAnswer) return;
                                    setSelectedAnswer(answer.key);
                                }}    
                            >
                                <input type="radio" id={answer.key} name="answer" value={answer.key} className="sr-only" />
                                <label
                                    htmlFor={answer.key}
                                    className="cursor-pointer flex items-center"
                                >
                                    {/* <div className="w-4 h-4 border border-gray-500 rounded-full mr-2">
                                        Custom radio selection indicator
                                        { (
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        )}
                                    </div> */}
                                    {answer.answer}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4">
                    <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">Raspund mai tarziu</button>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        onClick={() => {
                            setDisplayCorrectAnswer(true);
                        
                        }}
                    >Trimite raspunsul</button>
                </div>
                </Panel>
            </div>
        </div>
    );
}