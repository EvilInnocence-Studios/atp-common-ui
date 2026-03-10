import { overridable } from "@core/lib/overridable";
import clsx from "clsx";
import SVG from "react-inlinesvg";
import { SocialLinksProps } from "./SocialLinks.d";
import styles from './SocialLinks.module.scss';

interface IconProps {
    slug: string;
    variant?: string;
    width?: number;
    height?: number;
}

const Icon = ({slug, variant, width, height}:IconProps) => 
    <SVG
        src={`https://cdn.jsdelivr.net/gh/GLINCKER/thesvg@main/public/icons/${slug}/${variant || "mono"}.svg`}
        width={width}
        height={height}
        className={styles.icon}
    />


export const SocialLinksComponent = overridable(({ facebook, twitter, blueSky, instagram, patreon, youtube, tikTok, kofi, classes = styles }: SocialLinksProps) =>
    <div className={clsx([classes.socialLinks, "socialLinks"])}>
        <div className={classes.links}>
            {blueSky && <a href={`https://bsky.app/profile/${blueSky}`} target="_blank">
                <Icon slug="bluesky" />
            </a>}
            {twitter && <a href={`https://www.twitter.com/${twitter}`} target="_blank">
                <Icon slug="x" />
            </a>}
            {facebook && <a href={`https://www.facebook.com/${facebook}`} target="_blank">
                <Icon slug="facebook" />
            </a>}
            {instagram && <a href={`https://www.instagram.com/${instagram}`} target="_blank">
                <Icon slug="instagram" />
            </a>}
            {kofi && <a href={`https://ko-fi.com/${kofi}`} target="_blank">
                <Icon slug="ko-fi"/>
            </a>}
            {patreon && <a href={`https://www.patreon.com/${patreon}`} target="_blank">
                <Icon slug="patreon" />
            </a>}
            {youtube && <a href={`https://www.youtube.com/${youtube}`} target="_blank">
                <Icon slug="youtube" />
            </a>}
            {tikTok && <a href={`https://www.tiktok.com/${tikTok}`} target="_blank">
                <Icon slug="tiktok" />
            </a>}
        </div>
    </div>
);
