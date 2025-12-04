import Navbar from "@/components/Navbar";
import Panel from "@/components/Panel";
import { useState } from "react";

export default function QrCodePage() {

    const [value, setValue] = useState<string>("");


    return (
    <>
        <Navbar />
        <div className='pt-16 mt-16'></div>
        <div className="container mx-auto">
        <Panel>
             <input
                value={value}
                onChange={e => {setValue(e.currentTarget.value)}}
            />

            <h1>
                {value}
            </h1>
        </Panel>
           
        </div>
    </>)
}