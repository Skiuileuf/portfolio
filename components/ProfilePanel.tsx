
interface ProfilePanelProps {
    className?: string;
    left: React.ReactNode;
    top: React.ReactNode;
    bottom: React.ReactNode;
}

export default function ProfilePanel({ className, left, top, bottom }: ProfilePanelProps) {
    return (
        <div className={`grid grid-cols-1 lg:grid-cols-2 ${className}`}>
            <div className="row-span-2">
                {left}
            </div>
            {top}
            {bottom}
        </div>
    );
}