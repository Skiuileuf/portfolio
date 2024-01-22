import type { NextApiRequest, NextApiResponse } from 'next'
const fs = require('fs');
const path = require('path');

export interface Cont {
  numar: string;
  nume: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Cont[]>
) {
  // res.status(200).json({ name: 'John Doe' })

  //read text from "1802.txt"

  const filePath = path.join(process.cwd(), '1802.txt');
  // const fileContents = fs.readFileSync(filePath, 'utf8');
  
  const conturi = fs.readFileSync('1802.txt', 'utf8').split('\n');

  const conturiArray: Cont[] = [];

  conturi.forEach((cont: string) => {
    const [numar, nume] = cont.split('.');
    conturiArray.push({ numar : numar.trim(), nume: nume ? nume.trim() : ""}); 
  });

  // console.log(JSON.stringify(conturiArray, null, 2));

  res.status(200).json(conturiArray);

}
