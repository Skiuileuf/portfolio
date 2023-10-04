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
        <div className="flex lg:flex-row flex-col">
            {WorkEntries.map((entry, index) => (
                <div
                    key={index}
                    className="bg-gray-200 text-gray-700 text-sm rounded-md px-2 py-1 mr-0 lg:mr-2 mb-2 lg:mb-0 last:mb-0"
                >
                    <h2 className="text-xl font-semibold mb-1">{entry.place}</h2>
                    <h2 className="text-base font-semibold mb-0">{entry.description}</h2>
                    <h2 className="text-base font-semibold mb-1">{entry.position}</h2>
                    {entry.responsibilities && <ul className="list-disc list-inside">
                        {entry.responsibilities.map((responsibility, index) => (
                            <li key={index}>{responsibility}</li>
                        ))}
                    </ul>}
                    <h2 className="text-xl font-semibold">{entry.period}</h2>
                    
                    {/* {entry.subHonors && <h2 className="text-xl font-semibold">{entry.subHonors}</h2>} */}
                </div>
            ))}
        </div>

    )
}