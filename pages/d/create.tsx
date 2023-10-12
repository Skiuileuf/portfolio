import Panel from "@/components/Panel";
import { useState } from "react";

export default function LinkCreator() {
    const [thumbnailImage, setThumbnailImage] = useState("");
    const [videoURL, setVideoURL] = useState("");
    const [videoHeight, setVideoHeight] = useState("");
    const [videoWidth, setVideoWidth] = useState("");
    const [refresh, setRefresh] = useState("");

    return (
        <div className="container mx-auto p-4">
            <Panel className="p-6">
                <label className="block text-gray-700 text-lg font-semibold">Thumbnail Image</label>
                <input
                    type="text"
                    className="w-full border rounded-md mt-2 p-2"
                    placeholder="Enter Thumbnail Image URL"
                    value={thumbnailImage}
                    onChange={(e) => setThumbnailImage(e.target.value)}
                />

                <label className="block text-gray-700 text-lg font-semibold mt-4">Video URL</label>
                <input
                    type="text"
                    className="w-full border rounded-md mt-2 p-2"
                    placeholder="Enter Video URL"
                    value={videoURL}
                    onChange={(e) => setVideoURL(e.target.value)}
                />

                <label className="block text-gray-700 text-lg font-semibold mt-4">Video Height</label>
                <input
                    type="number"
                    className="w-full border rounded-md mt-2 p-2"
                    placeholder="Enter Video Height"
                    value={videoHeight}
                    onChange={(e) => setVideoHeight(e.target.value)}
                />

                <label className="block text-gray-700 text-lg font-semibold mt-4">Video Width</label>
                <input
                    type="number"
                    className="w-full border rounded-md mt-2 p-2"
                    placeholder="Enter Video Width"
                    value={videoWidth}
                    onChange={(e) => setVideoWidth(e.target.value)}
                />

                <label className="block text-gray-700 text-lg font-semibold mt-4">Refresh URL</label>
                <input
                    type="text"
                    className="w-full border rounded-md mt-2 p-2"
                    placeholder="Enter Refresh URL"
                    value={refresh}
                    onChange={(e) => setRefresh(e.target.value)}
                />

                <p>
                    {(() => {
                        const url = new URL("https://viziteumihai.ro/d");
                        url.searchParams.set("ti", thumbnailImage);
                        url.searchParams.set("vu", videoURL);
                        videoHeight && url.searchParams.set("vh", videoHeight);
                        videoWidth && url.searchParams.set("vw", videoWidth);
                        refresh && url.searchParams.set("rf", refresh);

                        return url.href;
                    })()}
                </p>

            </Panel>
        </div>

    );
}