import { BeakerIcon } from '@heroicons/react/24/solid'

interface AwardEntry {
    event: string;
    description?: string;
    date: string;
    awardName?: string;

};

const AwardEntries: AwardEntry[] = [
    {
        event: "Sesiunea stiintifica studenteasca",
        description: "Aplicatie pentru fidelizarea clientilor unei cafenele",
        date: "Aprilie 2024",
        awardName: "Locul I"
    },
    {
        event: "Sesiunea stiintifica studenteasca",
        description: "Sistem informatic de gestiune a unui complex imobiliar",
        date: "Aprilie 2023",
        awardName: "Locul III"
    },
    {
        event: "Olimpiada Nationala a Economistilor in Formare",
        description: "Sistem informatic de gestiune a unui complex imobiliar",
        date: "2023",
        awardName: "Premiu din partea BNR"
    },
    // {
    //     event: "First Tech Challenge - SkyStone",
    //     description: "FTC RO 195 RoboOtopeni",
    //     date: "2019",
    //     awardName: "Participare"
    // },
];

export default function Awards() {
    return (
        <>
            <div className="flex lg:flex-row flex-col">
                {AwardEntries.map((entry, index) => (
                    <div
                        key={index}
                        className="bg-gray-200 text-gray-700 text-sm rounded-md px-2 py-1 mr-0 lg:mr-2 mb-2 lg:mb-0 last:mb-0"
                    >
                        <h2 className="text-xl font-semibold mb-1">{entry.event}</h2>
                        <h2 className="text-base font-semibold mb-0">{entry.description}</h2>
                        <h2 className="text-base font-semibold mb-1">{entry.date}</h2>
                        {entry.awardName && <h2 className="text-xl font-semibold">{entry.awardName}</h2>}
                    </div>
                ))}
            </div>

        </>
    )
}