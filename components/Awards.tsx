import { BeakerIcon } from '@heroicons/react/24/solid'
import { CardFooter, InfoCard, ScrollableRow } from './ScrollableUI';

interface AwardEntry {
    event: string;
    description?: string;
    date: string;
    awardName?: string;
};

const AwardEntries: AwardEntry[] = [
    {
        event: "HACKATHON Code Quest UPB",
        description: "Eldia Connect - Aplicatie VPN",
        date: "Decembrie 2025",
        awardName: "Locul I"
    },
    {
        event: "Sesiunea stiintifica studenteasca",
        description: "Platforma educationala de tip trivia pentru evaluarea si imbunatatirea cunostintelor de specialitate",
        date: "Aprilie 2025",
        awardName: "Mentiune I"
    },
    {
        event: "Sesiunea stiintifica studenteasca",
        description: "Aplicatie pentru fidelizarea clientilor unei cafenele",
        date: "Aprilie 2024",
        awardName: "Locul I"
    },
    {
        event: "Olimpiada Nationala a Economistilor in Formare",
        description: "Sistem informatic de gestiune a unui complex imobiliar",
        date: "Mai 2023",
        awardName: "Premiu din partea BNR"
    },
    {
        event: "Sesiunea stiintifica studenteasca",
        description: "Sistem informatic de gestiune a unui complex imobiliar",
        date: "Aprilie 2023",
        awardName: "Locul III"
    },
    {
        event: "First Tech Challenge - SkyStone",
        description: "FTC RO 195 RoboOtopeni",
        date: "2019",
        awardName: "Participare"
    },
];
export default function Awards() {
    return (
        <ScrollableRow>
            {AwardEntries.map((entry, index) => (
                <InfoCard key={index}>
                    <div>
                        <h2 className="text-lg font-bold mb-2 leading-tight">{entry.event}</h2>
                        <p className="text-sm font-medium mb-3 text-gray-600">{entry.description}</p>
                    </div>
                    <CardFooter>
                        <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{entry.date}</p>
                        {entry.awardName && (
                            <h2 className="text-lg font-bold text-indigo-600">{entry.awardName}</h2>
                        )}
                    </CardFooter>
                </InfoCard>
            ))}
        </ScrollableRow>
    )
}