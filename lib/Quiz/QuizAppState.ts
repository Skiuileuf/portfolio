import { MultipleChoiceQuestion } from "./MultipleChoice";

export class QuizOptions {

}

export class SavedQuestion {
    question: MultipleChoiceQuestion = {} as MultipleChoiceQuestion;
    answer: string = "";
}

export class QuizAppState {
    questions?: SavedQuestion[];
    currentQuestionIndex: number = 0;
    startDate?: Date;
    timeElapsed: number = 0;

    options?: QuizOptions;
}