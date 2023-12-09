import { MultipleChoiceQuestion } from "@/lib/Quiz/MultipleChoice";
import { useEffect, useState } from "react";
import Panel from "../Panel";

export interface QuestionPanelProps {
    question: MultipleChoiceQuestion;
    nextButtonLabel?: string;
    onNextQuestion?: (selectedAnswer: string) => void;
    onSkipQuestion?: () => void;
    selectedAnswer?: string;
}

export default function QuestionPanel({ question, onNextQuestion, onSkipQuestion, nextButtonLabel, selectedAnswer: selAns }: QuestionPanelProps) {

    function getColorForAnswer(key: string, selAns: string = selectedAnswer, dsCorrAns: boolean = displayCorrectAnswer) {
        if (dsCorrAns) {
            if (key == selAns && key != question.correctAnswer) {
                return "bg-red-500 text-white";
            } else if (key == question.correctAnswer) {
                return "bg-green-500 text-white";
            }
        } else {
            if (key == selAns) {
                return "bg-blue-500 text-white";
            }
        }
        return "bg-gray-300 text-black";
    }

    const [selectedAnswer, setSelectedAnswer] = useState<string>(selAns || "");
    const [displayCorrectAnswer, setDisplayCorrectAnswer] = useState<boolean>(false);

    useEffect(() => {
        setSelectedAnswer("");
        setDisplayCorrectAnswer(false);
    }, [question]);

    useEffect(() => {
        setSelectedAnswer(selAns || "");
    }, [selAns, question]);

    return (
        <Panel>
            <h1 className="text-4xl font-bold">Intrebarea {question.id}</h1>
            <h2 className="text-2xl mb-2">{question.prompt}</h2>
            <div>
                {question.answers.map((answer, index) => (
                    <div
                        key={index}
                        className={`mb-2 p-2 border border-gray-300 rounded ${!displayCorrectAnswer && "cursor-pointer"} ${getColorForAnswer(
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
                        <label htmlFor={answer.key} className={`${!displayCorrectAnswer && "cursor-pointer"} flex items-center`}>
                            {answer.answer}
                        </label>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-4">
                <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                    onClick={() => { onSkipQuestion && onSkipQuestion()  }}
                >
                    Raspund mai tarziu
                </button>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={() => {
                        if(!selectedAnswer) return;

                        if(displayCorrectAnswer == false) {
                            setDisplayCorrectAnswer(true);
                        } else {
                            onNextQuestion && onNextQuestion(selectedAnswer);
                        }
                    }}
                >
                    {nextButtonLabel || "Trimite raspunsul"}
                </button>
            </div>
        </Panel>
    );
}