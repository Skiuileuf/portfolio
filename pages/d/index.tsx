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