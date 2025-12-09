import { ReactNode } from "react";

// 1. The Container Component
export function ScrollableRow({ children }: { children: ReactNode }) {
    return (
        <div className="w-full">
            <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 snap-x">
                {children}
            </div>
        </div>
    );
}

// 2. The Card Component
export function InfoCard({ children }: { children: ReactNode }) {
    return (
        <div className="bg-gray-200 text-gray-700 text-sm rounded-md p-4 w-80 flex-shrink-0 flex flex-col justify-between snap-start">
            {children}
        </div>
    );
}

// 3. Optional: Helper for consistent footers (Dates/Awards)
export function CardFooter({ children }: { children: ReactNode }) {
    return (
        <div className="mt-2 pt-2 border-t border-gray-300">
            {children}
        </div>
    );
}