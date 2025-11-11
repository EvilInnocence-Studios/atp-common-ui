import { CSSProperties, FC, useEffect, useRef, useState } from "react";
import Markdown from 'react-markdown';
import remarkDirective from "remark-directive";
import remarkDirectiveSugar from "remark-directive-sugar";
import { toMarkdown } from "./BlueskyFeed.container";
import { BlueskyFeedProps } from "./BlueskyFeed.d";
import styles from "./BlueskyFeed.module.scss";
import { AppBskyEmbedDefs, AppBskyEmbedImages, AppBskyEmbedVideo } from "@atproto/api";
import { useBlueskyHLS } from "./useBlueSkyHLS";
import clsx from "clsx";

const RichTextRenderer = ({text}: {text: string}) => {
    const [markdown, setMarkdown] = useState<string>('');
    useEffect(() => {
        if (typeof text === 'string') {
            toMarkdown(text).then(setMarkdown).catch(console.error);
        }
    }, [text]);
    return <Markdown remarkPlugins={[remarkDirective, remarkDirectiveSugar]}>{markdown}</Markdown>;
}

const commonStyles = (
	borderColor: string,
	aspect?: AppBskyEmbedDefs.AspectRatio,
): CSSProperties => ({
	width: "100%",
	borderRadius: 10,
	border: `1px solid ${borderColor}`,
	aspectRatio: aspect ? `${aspect.width} / ${aspect.height}` : undefined,
});

const BlueskyVideo: FC<{ video: AppBskyEmbedVideo.View }> = ({ video }) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [_hasSubtitleTrack, setHasSubtitleTrack] = useState(false);
	const [_hlsLoading, setHlsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useBlueskyHLS({
		playlist: video.playlist,
		setHasSubtitleTrack,
		setError,
		videoRef,
		setHlsLoading,
	});

	if (error) {
		console.error("Video embed error", error);
		return null;
	}

	return (
		<video
			ref={videoRef}
			title={video.alt}
			poster={video.thumbnail}
            style={commonStyles("#ccc", video.aspectRatio)}
			preload="none"
			playsInline
			controls
		/>
	);
};

export const BlueskyFeedComponent = ({pageSize, feed}:BlueskyFeedProps) => <>
    {feed && <div className={clsx([styles.feed, "feed"])}>
        {feed.feed.slice(0, pageSize || 10).filter(item => !item.reason).map((item) => (
            <div key={item.post.cid} className={styles.post}>
                <div className={styles.header}>
                    <div className={styles.date}>
                        {new Date(item.post.record.createdAt as string).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </div>
                </div>
                <div className={styles.content}>
                    <RichTextRenderer text={(item.post.record as any).text || ''} />
                </div>

                {item.post.embed && <div className={styles.embed}>
                    {item.post.embed.$type === 'app.bsky.embed.images#view' && ((item.post.embed as AppBskyEmbedImages.View).images).map((image, index) => <>
                        <img
                            key={index}
                            src={image.thumb}
                            alt={image.alt || 'Bluesky Image'}
                            className={styles.embedImage}
                        />
                    </>)}
                    {item.post.embed.$type === "app.bsky.embed.video#view" && <BlueskyVideo video={item.post.embed as AppBskyEmbedVideo.View} />}
                </div>}
            </div>
        ))}
    </div>}
</>;
