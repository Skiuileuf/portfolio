interface Skill {
    name: string;
    proficiency?: number;
}

const skills: Skill[] = [
    { name: 'React', proficiency: 4 },
    { name: 'Next.js', proficiency: 4 },
    { name: 'Node.js', proficiency: 3 },
    { name: 'Express', proficiency: 3 },
    { name: 'MySQL', proficiency: 4 },
    { name: 'Git', proficiency: 3 },
    // { name: 'HTML' },
    // { name: 'CSS' },
    // { name: 'TypeScript' },
    // { name: 'REST' },
    // { name: 'CRUD' },
    // { name: 'JSON' },
];

function Stars({ count }: { count?: number }) {
    if (!count) {
        return null;
    }
    return (
        <div className="flex flex-row gap-[1px]">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className={`hidden md:block lg:hidden xl:block w-4 h-4 translate-y-1 rounded-full ${index < count! ? 'bg-gray-800' : 'bg-gray-400'}`}></div>
            ))}
            <span className="block md:hidden lg:block xl:hidden">
                <div className='bg-gray-800 text-gray-100 rounded-full px-2'>{count}</div>
                {/* <span className="">{count}</span> */}
                {/* <div className={`align-top inline-block ml-2 w-4 h-4 translate-y-1 rounded-full bg-gray-800`}></div> */}
            </span>
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