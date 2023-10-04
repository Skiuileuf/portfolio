import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface ContactInformation {
    name: string;
    icon: React.ReactNode;
    link: string;
}

const contactInformation: ContactInformation[] = [
    {
        name: 'LinkedIn',
        icon: <FontAwesomeIcon icon={faLinkedin} className="text-white w-4 h-4"/>,
        link: 'https://www.linkedin.com/in/viziteu-mihai-cezar/',
    },
    {
        name: 'GitHub',
        icon: <FontAwesomeIcon icon={faGithub} className="text-white w-4 h-4"/>,
        link: "https://github.com/Skiuileuf"
    },
    {
        name: 'Email',
        icon: <FontAwesomeIcon icon={faEnvelope} className="text-white w-4 h-4"/>,
        link: "mailto:viziteu.cezar@gmail.com"
    },
]

export default function ContactButtons () {
    return (
        <div className="flex flex-row gap-2 mt-4">
            {contactInformation.map((contact, index) => (
                <Link
                    key={index}
                    href={contact.link}
                    className="flex flex-row items-center justify-center px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700"
                >
                    <>
                    {contact.icon}
                    <span className="ml-2 text-white">{contact.name}</span>
                    
                    </>
                    
                </Link>
            ))}
        </div>
    )
}