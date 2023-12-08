'use client'
import { Answer, MultipleChoiceQuestion } from "@/lib/Quiz/MultipleChoice";
import { promises } from "fs";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = Number.parseInt(req.query.id as string);

    if(isNaN(id) || id < 1 || id > 500) { return res.status(404).json({ message: 'Not found' }); }

    const questions = await promises.readFile('./data/quiz.json', 'utf8');
    const questionsArray: Array<Answer> = JSON.parse(questions);

    return res.status(200).json(questionsArray[id - 1]);
}