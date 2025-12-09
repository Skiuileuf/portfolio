import Project, { ProjectProps } from "./Project"

const CurrentProjects: ProjectProps[] = [
    {
        title: "nicoviangi",
        description: "Siteul companiei nicoviangi.",
        technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"],
        image: "images/nicoviangi.png",
        sourceLink: "https://github.com/Skiuileuf/nicoviangi",
        deploymentLink: "https://nicoviangi.ro"
    },
    {
        title: "Procesare Feedback",
        description: "Program care proceseaza si centralizeaza feedback-ul profesoral primit de la elevi.",
        technologies: ["C#", "Windows Forms"],
        image: "images/procesarefeedback.png",
        sourceLink: "https://github.com/Skiuileuf/ProcesareFeedback"
    },
    // {
    //     title: "SkyStone (First Tech Challenge)",
    //     description: "Software-ul echipei de robotica FTC RO 195 RoboOtopeni pentru sezonul 2019-2020.",
    //     technologies: ["Java", "Android Studio"],
    //     image: "images/profile.png",
    //     sourceLink: "https://github.com/myusername/my-project"
    // },
    // {
    //     title: "Unity Dark Theme Patcher",
    //     description: "Program care schimba tema de culoare in Unity prin modificarea executabilului (necesar doar in versiuni mai vechi).",
    //     technologies: ["C#", "Windows Forms"],
    //     image: "images/profile.png",
    //     sourceLink: "https://github.com/myusername/my-project"
    // },
    {
        title: "Receipt Analyzer",
        description: "Transforma o imagine cu un bon fiscal intr-un fisier JSON cu datele de pe bon.",
        technologies: ["C#", ".NET", "IronOcr"],
        image: "images/profile.png",
        sourceLink: "https://github.com/Skiuileuf/ReceiptAnalyzer"
    },
        {
        title: "Server Minecraft",
        description: "Server de Minecraft + Proxy Velocity, selfhosted",
        technologies: ["Minecraft", "Paper", "Velocity"],
        image: "https://mc.viziteumihai.ro/tiles/minecraft_overworld/3/-1_0.png",
        // sourceLink: "https://github.com/myusername/my-project"
        deploymentLink: "https://mc.viziteumihai.ro"
    },
    //     {
    //     title: "Receipt Analyzer",
    //     description: "Transforma o imagine cu un bon fiscal intr-un fisier JSON cu datele de pe bon.",
    //     technologies: ["C#", ".NET", "IronOcr"],
    //     image: "images/profile.png",
    //     sourceLink: "https://github.com/myusername/my-project"
    // },
    // {
    //     title: "nondestructive-fire",
    //     description: "Un mod pentru Minecraft care face focul sa nu distruga blocuri.",
    //     technologies: ["Java", "Minecraft Modding", "Forge"],
    //     image: "images/profile.png",
    //     sourceLink: "https://github.com/myusername/my-project"
    // },
]

export default function Projects() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            {CurrentProjects.map((project: ProjectProps, index: number) => (
                <Project
                    key={index}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    sourceLink={project.sourceLink}
                    deploymentLink={project.deploymentLink}
                    technologies={project.technologies}
                />
            ))}
        </div>
    )
}