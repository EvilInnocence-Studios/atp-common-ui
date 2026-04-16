import SVG from "react-inlinesvg";
import styles from './SocialLinks.module.scss';

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
    />;
