
export interface ProjectProps {
    title: string;
    description: string;
    image: string;
    sourceLink?: string;
    deploymentLink?: string;
    technologies: string[];
}

export default function Project({ title, description, image, sourceLink, deploymentLink, technologies }: ProjectProps) {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={image} alt={title} className="w-full h-auto aspect-video overflow-clip object-cover border-x border-t" />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-700 mb-3 h-12">{description}</p>
                <div className="flex flex-wrap mb-2">
                    {technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="bg-gray-200 text-gray-700 text-sm rounded-full px-2 py-1 mr-2 mb-2"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="flex flex-wrap gap-2">
                    {sourceLink &&
                    <a
                        href={sourceLink}
                        target="_blank"
                        className="flex flex-row items-center justify-center px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700 text-gray-100"
                    >
                        View Project
                    </a>
        }
                    {deploymentLink && <a
                        href={deploymentLink}
                        target="_blank"
                        className="flex flex-row items-center justify-center px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800"
                    >
                        View Deployment
                    </a>
                    }
                </div>

            </div>
        </div>
    );
}