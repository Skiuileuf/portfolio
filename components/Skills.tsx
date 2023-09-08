import Panel from "./Panel";

interface Skill {
    name: string;
    proficiency?: number;
}

const skills: Skill[] = [
    { name: 'React', proficiency: 1 },
    { name: 'Next.js', proficiency: 2 },
    { name: 'Node.js', proficiency: 3 },
    { name: 'Express', proficiency: 4 },
    { name: 'MySQL', proficiency: 5 },
    { name: 'Git', proficiency: 5 },
    { name: 'HTML' },
    { name: 'CSS' },
    { name: 'TypeScript' },
    { name: 'REST' },
    { name: 'CRUD' },
    { name: 'JSON' },
];

function Stars({ count }: { count?: number }) {
    if (!count) {
        return null;
    }
    return (
        <div className="flex flex-row gap-[1px]">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className={`w-4 h-4 translate-y-1 rounded-full ${index < count! ? 'bg-gray-800' : 'bg-gray-400'}`}></div>
            ))}
        </div>
    )
}

export default function Skills() {
    return (
        <div className="grid grid-cols-3 gap-x-8">
            {
                skills.map((skill, index) => (
                    <div key={index} className="flex justify-between align-bottom">
                        <div key={index}>{skill.name} </div>
                        <Stars count={skill.proficiency} />
                    </div>
                ))
            }
        </div>
    );
}