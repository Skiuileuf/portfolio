import { CardFooter, InfoCard, ScrollableRow } from "./ScrollableUI";

interface WorkExperienceEntry {
    place: string;
    period: string;
    position: string;
    description?: string;
    responsibilities?: string[];
}

const WorkEntries: WorkExperienceEntry[] = [
    {
        place: "nicoviangi.ro",
        period: "Q4 2022",
        position: "Software Developer",
        description: "Site de prezentare dezvoltator imobiliar.",
        responsibilities: [
            "Proiectare website in conformitate cu cerintele clientului",
            "Implementare design, functionalitati si continut",
            "Optimizare SEO",
        ]
    },
    {
        place: "ikonisart.ro",
        period: "2022 - prezent",
        position: "Software Developer",
        description: "Magazin online cu icoane bizantine.",
        responsibilities: [
            "Optimizare SEO",
            "Implementarea de extensii pentru OpenCart",
            "Configurare si customizarea designului dupa cerintele clientului",
        ]
    }
];

export default function WorkExperience() {
    return (
        <ScrollableRow>
            {WorkEntries.map((entry, index) => (
                <InfoCard key={index}>
                    <div>
                        <h2 className="text-lg font-bold mb-1 leading-tight">{entry.place}</h2>
                        <h3 className="text-base font-semibold text-indigo-600 mb-2">{entry.position}</h3>
                        
                        {entry.description && (
                            <p className="text-sm font-medium text-gray-600 mb-3 italic">
                                "{entry.description}"
                            </p>
                        )}

                        {entry.responsibilities && (
                            <ul className="list-disc list-outside ml-4 text-xs text-gray-700 space-y-1 mb-4 marker:text-gray-500">
                                {entry.responsibilities.map((res, i) => (
                                    <li key={i}>{res}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <CardFooter>
                        <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
                            {entry.period}
                        </p>
                    </CardFooter>
                </InfoCard>
            ))}
        </ScrollableRow>
    )
}