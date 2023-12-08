export interface Answer {
    key: string;
    answer: string;
}

export interface MultipleChoiceQuestion {
    id: string;
    category?: string;
    prompt: string;
    answers: Answer[];
    correctAnswer: string;
}