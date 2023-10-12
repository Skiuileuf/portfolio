import Panel from "@/components/Panel";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function DiscordTrolling() {

    const router = useRouter();

    const thumbnailImage = router.query.ti as string;
    const videoURL = router.query.vu as string;
    const videoHeight = router.query.vh as string;
    const videoWidth = router.query.vw as string;
    const refresh = router.query.rf as string;

    console.log(thumbnailImage, videoURL, videoHeight, videoWidth, refresh);

    const isValid = thumbnailImage && videoURL;

    if (!isValid) {
        return <LinkCreator />
    }

    return (
        <HeadContent 
            thumbnailImage={thumbnailImage} 
            videoURL={videoURL} 
            videoHeight={videoHeight} 
            videoWidth={videoWidth} 
            refresh={refresh} 
        />
    )
}


function LinkCreator() {
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


interface HeadContentProps {
    thumbnailImage: string;
    videoURL: string;
    videoHeight: string;
    videoWidth: string;
    refresh: string;
}

function HeadContent(props: HeadContentProps) {
    return <Head>
        {/* <!-- Thumbnail image/gif --> */}
        {/* <meta property="og:image" content="https://raw.githubusercontent.com/discowd-nitro/media-files/main/media/huh.gif" /> */}
        <meta property="og:image" content={props.thumbnailImage} />
        <meta property="og:type" content="video.other" />

        {/* <!-- Video Link --> */}
        {/* <meta property="og:video:url" content="https://raw.githubusercontent.com/discowd-nitro/media-files/main/media/misery.mp4" /> */}
        <meta property="og:video:url" content={props.videoURL} />
        {/* <!-- If you want a seamless transition between your thumbnail size and video size, adjust these values to match your thumbnail resolution. -->
        <!-- However, it will be all wonky if your thumbnail is vertical and your video is horizontal. This works best with similar aspect ratios --> */}
        <meta property="og:video:height" content={props.videoHeight ?? "202"} />
        <meta property="og:video:width" content={props.videoWidth ?? "250"} />

        {/* <!-- Redirect --> */}
        {props.refresh && <meta httpEquiv="refresh" content={`0; url=${props.refresh}`} />}
    </Head>
}
