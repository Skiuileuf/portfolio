import { AcademicCapIcon } from '@heroicons/react/24/solid'
import { CardFooter, InfoCard, ScrollableRow } from './ScrollableUI';

interface EducationEntry {
    institution: string;
    degree: string;
    specialization: string;
    startDate: string;
    endDate: string;
    description?: string;
    subHonors?: string;
}

const EducationEntries: EducationEntry[] = [
     {
        institution: "Academia de Studii Economice din Bucuresti",
        degree: "Master",
        specialization: "Informatică de Gestiune",
        startDate: "2025",
        endDate: "2027",
    },
     {
        institution: "Academia de Studii Economice din Bucuresti",
        degree: "Master",
        specialization: "Departamentul pentru Pregătirea Personalului Didactic",
        startDate: "2025",
        endDate: "2027",
    },
    {
        institution: "Academia de Studii Economice din Bucuresti",
        degree: "Licență",
        specialization: "Contabilitate și Informatică de Gestiune",
        startDate: "2022",
        endDate: "2025",
    },
    {
        institution: "Academia de Studii Economice din Bucuresti",
        degree: "Licență",
        specialization: "Departamentul pentru Pregătirea Personalului Didactic",
        startDate: "2022",
        endDate: "2025",
    },
    {
        institution: "Liceul Teoretic \"Ioan Petrus\" Otopeni",
        degree: "Bacalaureat",
        specialization: "Matematică-Informatică",
        startDate: "2018",
        endDate: "2022"
    },
];

export default function Education() {
    return (
        <ScrollableRow>
            {EducationEntries.map((entry, index) => (
                <InfoCard key={index}>
                    <div>
                        <h2 className="text-lg font-bold mb-1 leading-tight">{entry.institution}</h2>
                        <h3 className="text-base font-semibold text-indigo-600 mb-1">{entry.degree}</h3>
                        <p className="text-sm font-medium text-gray-600 mb-3 leading-snug">
                            {entry.specialization}
                        </p>
                    </div>
                    <CardFooter>
                        <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                            {entry.startDate} - {entry.endDate}
                        </p>
                        {entry.subHonors && (
                            <h2 className="text-lg font-bold mt-1">{entry.subHonors}</h2>
                        )}
                    </CardFooter>
                </InfoCard>
            ))}
        </ScrollableRow>
    )
}