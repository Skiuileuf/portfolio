import { AcademicCapIcon } from '@heroicons/react/24/solid'

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
        <div className="flex lg:flex-row flex-col">
            {EducationEntries.map((entry, index) => (
                <div
                    key={index}
                    className="bg-gray-200 text-gray-700 text-sm rounded-md px-2 py-1 mr-0 lg:mr-2 mb-2 lg:mb-0 last:mb-0"
                >
                    <h2 className="text-xl font-semibold mb-1">{entry.institution}</h2>
                    <h2 className="text-base font-semibold mb-0">{entry.degree}</h2>
                    <h2 className="text-base font-semibold mb-1">{entry.specialization}</h2>
                    <h2 className="text-xl font-semibold">{entry.startDate} - {entry.endDate}</h2>
                    {entry.subHonors && <h2 className="text-xl font-semibold">{entry.subHonors}</h2>}
                </div>
            ))}
        </div>

    )
}