import { Answer, MultipleChoiceQuestion } from "@/lib/Quiz/MultipleChoice";
import { promises } from "fs";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    function getCategoryForQuestionId(id: string) {
        const number = parseInt(id.split(' ')[0]);

        switch (true) {
            case number <= 10:
                return 'CeEsteEconomia?';
            case number <= 18:
                return 'AgentiiEconomici';
            case number <= 37:
                return 'Consumatorul';
            case number <= 66:
                return 'Producatorul';
            case number <= 108:
                return 'UtilizareaFactorilorDeProductie';
            case number <= 190:
                return 'Veniturile';
            case number <= 230:
                return 'Piata';
            case number <= 244:
                return 'PieteConcurentaPreturi';
            case number <= 290:
                return 'PiataMonetara';
            case number <= 322:
                return 'PiataFinanciara';
            case number <= 336:
                return 'PiataMuncii';
            case number <= 396:
                return 'VenitulConsumulSiInvestitiile';
            case number <= 420:
                return 'CrestereaSiDezvoltareaEconomica';
            case number <= 449:
                return 'InflatiaSiSomajul';
            case number <= 462:
                return 'StatulInEconomiaDePiata';
            case number <= 494:
                return 'PiataMondiala';
            case number <= 499:
                return 'IntegrareaEconomicaSiGlobalizarea';
            default:
                return 'None';
        }
    }

    // promises.readFile('./data/quiz.json', 'utf8');
    const questions = await promises.readFile('./data/text.txt', 'utf8');

    const questionsArray = questions.split('\r\n');
    const MultipleChoiceQuestions = new Array<MultipleChoiceQuestion>();

    const answerkey = await promises.readFile('./data/answerkey.json', 'utf8');
    const answerkeyArray: Array<Answer> = JSON.parse(answerkey);

    // console.log(Array.isArray(answerkeyArray));

    while(questionsArray.length > 0) {
        const question = questionsArray.shift()!; // 1

        const questionId = question.split('.')[0].trim();

        const answers = new Array<Answer>();
        for( let j = 1; j <= 5; j++) {
            const answer = questionsArray.shift()!.trim(); // 2 3 4 5 6
            answers.push( {
                key: answer.split(')')[0].trim(),
                answer: answer.split(')')[1].trim()
            });
        }
        questionsArray.shift(); // newline

        const mcq: MultipleChoiceQuestion = {
            id: questionId,
            category: getCategoryForQuestionId(questionId),
            prompt: question.substring(questionId.length + 1).trim(),
            answers: answers,
            correctAnswer: answerkeyArray.find(a => a.key === questionId)!.answer || "none"
            // correctAnswer: "none"
        };
        MultipleChoiceQuestions.push(mcq);
    }

    // await promises.writeFile('./data/quiz.json', JSON.stringify(MultipleChoiceQuestions));


    // return res.status(200).json({ a: MultipleChoiceQuestions });
    return res.status(200).json(MultipleChoiceQuestions);
}