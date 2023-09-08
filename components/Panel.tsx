import { DetailedHTMLProps, HTMLAttributes } from "react";


export default function Panel(props : DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    return (
        <div {...props} className={`bg-white shadow-lg rounded-lg overflow-hidden ${props.className}`} >
            <div className="p-4">
                {props.children}
            </div>
        </div>
    )
}