import Panel from "@/components/Panel";
import QuestionPanel from "@/components/quiz/QuestionPanel";
import { MultipleChoiceQuestion } from "@/lib/Quiz/MultipleChoice";
import { QuizAppState } from "@/lib/Quiz/QuizAppState";
import useLocalStorage from "@/lib/useLocalStorage";
import { useEffect, useState } from "react";

export default function TestPage() {
    const [quizAppState, setQuizAppState] = useLocalStorage<QuizAppState>("quizAppState", new QuizAppState());
    //reducers
    function setQuestions(questions: MultipleChoiceQuestion[]) {
        setQuizAppState((prev) => {
            return {
                ...prev,
                questions: questions.map((question) => { return { question: question, answer: "" } })
            }
        });
    }

    function getQuestions() {
        return quizAppState.questions || [];
    }

    function setAnswerForQuestion(questionID: string, answer: string) {
        setQuizAppState((prev) => {
            if (!prev.questions) return prev;
            return {
                ...prev,
                questions: prev.questions.map((question) => {
                    if (question.question?.id === questionID) {
                        return { question: question.question, answer: answer };
                    }
                    return question;
                })
            }
        });
    }

    function getAnswerForQuestion(questionID: string) {
        if (!quizAppState.questions) return "";
        return quizAppState.questions.find((question) => question.question?.id === questionID)?.answer;
    }

    function setCurrentQuestionIndex(index: number) {
        setQuizAppState((prev) => {
            return {
                ...prev,
                currentQuestionIndex: index
            }
        });
    }

    function getCurrentQuestionIndex() {
        return quizAppState.currentQuestionIndex;
    }

    function setTimeElapsed(elapsed: number) {
        setQuizAppState((prev) => {
            return {
                ...prev,
                timeElapsed: elapsed
            }
        });
    }

    const [timeElapsed, setTE] = useState(quizAppState.timeElapsed);

    useEffect(() => {
        // Start a timer to track time elapsed
        const timer = setInterval(() => {
            setTE((prevTime) => {
                return prevTime + 1});
            
        }, 1000);

        window.addEventListener("beforeunload", (ev) => 
        {  
            setTimeElapsed(timeElapsed);
        });

        // Clean up the timer on component unmount
        return () => {
            clearInterval(timer)
        };
    }, []);

    const fetchQuestions = async () => {
        function randomProblemID() { return Math.floor(Math.random() * 500); }
        // Generate question ids
        const questionIDs: number[] = [];
        for (let i = 0; i < 10; i++) {
            questionIDs.push(randomProblemID());
        }

        const questions: MultipleChoiceQuestion[] = [];
        for (let i = 0; i < 10; i++) {
            const response = await fetch(`http://localhost:3000/api/quiz/micromacro/${questionIDs[i]}`);
            const data = await response.json();
            questions.push(data);
        }
        setQuestions(questions);
    }

    useEffect(() => {
        if (window.localStorage.getItem("quizAppState")) {
            return;
        }

        setTE(quizAppState.timeElapsed);

        // Check if test is already in progress
        if (quizAppState.questions) {
            return;
        }

        // Fetch questions
        fetchQuestions();
    }, []);

    if (!quizAppState.questions) {
        return <div>
            <h1 className="text-4xl font-bold">Se incarca...</h1>
        </div>;
    }

    function getColorForAnsweredQuestion(selectedIndex: number, currentIndex: number, correctAnswer: string, answer: string) {
        if(selectedIndex == currentIndex) {
            return "bg-blue-500 text-white";
        } else {
            if (answer.length != 0) {
                if (answer == correctAnswer) {
                    return "bg-green-500 text-white";
                } else {
                    return "bg-red-500 text-white";
                }
            }
        }

    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="container mx-auto flex">
                <div className="flex-1">
                    <QuestionPanel
                        question={getQuestions()[getCurrentQuestionIndex()].question}
                        nextButtonLabel={getCurrentQuestionIndex() == getQuestions().length - 1 ? "Vezi rezultatele" : "Urmatoarea intrebare"}
                        onNextQuestion={(ans) => {
                            setAnswerForQuestion(getQuestions()[getCurrentQuestionIndex()].question.id, ans);

                            const prevQuestion = getCurrentQuestionIndex();
                            if (prevQuestion > getQuestions().length - 2) {
                                setCurrentQuestionIndex(prevQuestion);
                                //We're at the end, show results
                                console.log("end");
                                
                            } else {
                                setCurrentQuestionIndex(prevQuestion + 1);
                            }
                        }}
                        selectedAnswer={getAnswerForQuestion(getQuestions()[getCurrentQuestionIndex()].question.id)}
                        onSkipQuestion={() => {
                            setCurrentQuestionIndex((() => {
                                const prevQuestion = getCurrentQuestionIndex();
                                if (prevQuestion > getQuestions().length - 2) {
                                    return prevQuestion;
                                }
                                return prevQuestion + 1
                            })());
                        
                        }}
                    />
                </div>
                <div className="w-1/4 ml-4">
                    <Panel>
                        <div className="flex justify-between">
                        <h2 className="text-2xl font-bold mb-2">Statistici Test</h2>
                        <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mb-2"
                            onClick={() => {
                                setQuizAppState((prev) => {
                                    return {
                                        ...prev,
                                        questions: prev.questions?.map((question) => {
                                            return { question: question.question, answer: "" }
                                        })
                                    }
                                });
                            
                            }}
                        >Reseteaza</button>
                        </div>
                        {/* Display current questions and answered count */}
                        {/* <p>Intrebari: {totalQuestions}</p>
                        <p>Raspunse: {answeredQuestions}</p> */}
                        <p>Intrebari: {getQuestions().length}</p>
                        <p>Raspunse: {getQuestions().map((q) => q.answer.length != 0).filter((e) => e == true).length}</p>
                        <p>Intrebarea curenta: {getCurrentQuestionIndex() + 1}</p>
                        <div className="flex cursor-pointer gap-1 justify-between">
                            {/* Questions overview */}
                            {getQuestions().map((question, index) => (
                                <div
                                    key={index}
                                    className={`mb-2 p-2 border border-gray-300 rounded 
                                        ${getColorForAnsweredQuestion(index, getCurrentQuestionIndex(), question.question.correctAnswer, question.answer)}
                                        `
                                    }
                                    onClick={() => {
                                        setCurrentQuestionIndex(index);
                                    }}
                                >
                                    <p className="text-sm">{index + 1}</p>
                                    {/* <p className="text-sm">{question.prompt}</p> */}
                                </div>
                            ))}
                        </div>
                    </Panel>
                </div>
            </div>
            <div className="fixed top-0 right-0 left-0 bg-gray-800 text-white p-2">
                <p className="text-center">Timp trecut: {timeElapsed} sec</p>
            </div>
        </div>
    );
}