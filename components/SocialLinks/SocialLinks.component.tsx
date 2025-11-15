import { faBluesky, faFacebook, faInstagram, faPatreon, faTiktok, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Link } from "react-router";
import { Setting } from "../Setting";
import { SocialLinksProps } from "./SocialLinks.d";
import styles from './SocialLinks.module.scss';
import { overridable } from "@core/lib/overridable";

export const SocialLinksComponent = overridable(({facebook, twitter, blueSky, instagram, patreon, youtube, tikTok, kofi}:SocialLinksProps) =>
    <div className={clsx([styles.socialLinks, "socialLinks"])}>
        <Link to="/">
            <Setting id="siteName" />
        </Link>
        <div className={styles.links}>
            {blueSky   && <a href={`https://bsky.app/profile/${blueSky}`}    target="_blank"><FontAwesomeIcon icon={faBluesky}   /></a>}
            {twitter   && <a href={`https://twitter.com/${twitter}`}         target="_blank"><FontAwesomeIcon icon={faTwitter}   /></a>}
            {facebook  && <a href={`https://www.facebook.com/${facebook}`}   target="_blank"><FontAwesomeIcon icon={faFacebook}  /></a>}
            {instagram && <a href={`https://www.instagram.com/${instagram}`} target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>}
            {kofi      && <a href={`https://ko-fi.com/${kofi}`}              target="_blank"><img src="/kofi_symbol.png"         /></a>}
            {patreon   && <a href={`https://www.patreon.com/${patreon}`}     target="_blank"><FontAwesomeIcon icon={faPatreon}   /></a>}
            {youtube   && <a href={`https://www.youtube.com/${youtube}`}     target="_blank"><FontAwesomeIcon icon={faYoutube}   /></a>}
            {tikTok    && <a href={`https://www.tiktok.com/${tikTok}`}       target="_blank"><FontAwesomeIcon icon={faTiktok}    /></a>}
        </div>
    </div>
);
