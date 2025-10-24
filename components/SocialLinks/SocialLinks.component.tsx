import { faBluesky, faFacebook, faInstagram, faPatreon, faTiktok, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Link } from "react-router";
import { Setting } from "../Setting";
import { SocialLinksProps } from "./SocialLinks.d";
import styles from './SocialLinks.module.scss';

export const SocialLinksComponent = ({facebook, twitter, blueSky, instagram, patreon, youtube, tikTok}:SocialLinksProps) =>
    <div className={clsx([styles.socialLinks])}>
        <Link to="/">
            <Setting id="siteName" />
        </Link>
        <div className={styles.links}>
            {facebook  && <a href={`https://www.facebook.com/${facebook}`}   target="_blank"><FontAwesomeIcon icon={faFacebook}  /></a>}
            {twitter   && <a href={`https://twitter.com/${twitter}`}         target="_blank"><FontAwesomeIcon icon={faTwitter}   /></a>}
            {blueSky   && <a href={`https://bsky.app/profile/${blueSky}`}    target="_blank"><FontAwesomeIcon icon={faBluesky}   /></a>}
            {instagram && <a href={`https://www.instagram.com/${instagram}`} target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>}
            {patreon   && <a href={`https://www.patreon.com/${patreon}`}     target="_blank"><FontAwesomeIcon icon={faPatreon}   /></a>}
            {youtube   && <a href={`https://www.youtube.com/${youtube}`}     target="_blank"><FontAwesomeIcon icon={faYoutube}   /></a>}
            {tikTok    && <a href={`https://www.tiktok.com/${tikTok}`}       target="_blank"><FontAwesomeIcon icon={faTiktok}    /></a>}
        </div>
    </div>;
