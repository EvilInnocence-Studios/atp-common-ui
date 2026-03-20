import { overridable } from "@core/lib/overridable";
import clsx from "clsx";
import SVG from "react-inlinesvg";
import { SocialLinksProps } from "./SocialLinks.d";
import styles from './SocialLinks.module.scss';
import { Bluesky } from "./Bluesky";
import { Twitter } from "./Twitter";
import { Facebook } from "./Facebook";
import { Instagram } from "./Instagram";
import { Kofi } from "./Kofi";
import { Patreon } from "./Patreon";
import { Youtube } from "./Youtube";
import { Tiktok } from "./Tiktok";

export declare interface IconProps {
    slug: string;
    variant?: string;
    width?: number;
    height?: number;
}

export const Icon = ({slug, variant, width, height}:IconProps) => 
    <SVG
        src={`https://cdn.jsdelivr.net/gh/GLINCKER/thesvg@main/public/icons/${slug}/${variant || "mono"}.svg`}
        width={width}
        height={height}
        className={styles.icon}
    />


export const SocialLinksComponent = overridable(({ facebook, twitter, blueSky, instagram, patreon, youtube, tikTok, kofi, classes = styles }: SocialLinksProps) =>
    <div className={clsx([classes.socialLinks, "socialLinks"])}>
        <div className={classes.links}>
            {blueSky   && <Bluesky   handle={blueSky}   />}
            {twitter   && <Twitter   handle={twitter}   />}
            {facebook  && <Facebook  handle={facebook}  />}
            {instagram && <Instagram handle={instagram} />}
            {kofi      && <Kofi      handle={kofi}      />}
            {patreon   && <Patreon   handle={patreon}   />}
            {youtube   && <Youtube   handle={youtube}   />}
            {tikTok    && <Tiktok    handle={tikTok}    />}
        </div>
    </div>
);
