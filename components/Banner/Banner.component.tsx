import clsx from "clsx";
import { Link } from "react-router";
import { BannerImage } from "../BannerImage";
import { BannerProps } from "./Banner.d";
import styles from './Banner.module.scss';
import { overridable } from "@core/lib/overridable";

export const BannerComponent = overridable(({banner, className}:BannerProps) => 
    <div className={clsx([styles.banner, className])}>
        <Link to={banner.link}>
            <div className={styles.info}>
                <h1>{banner.title}</h1>
                <p>{banner.description}</p>
            </div>
        </Link>
        {!!banner.buttonText && <div className={clsx([styles.button, banner.buttonLocation && styles[banner.buttonLocation]])}>
            <Link to={banner.buttonLink || ""}>
                {banner.buttonText}
            </Link>
        </div>}
        {!!banner.buttonTextAlt && <div className={clsx([styles.button, banner.buttonLocationAlt && styles[banner.buttonLocationAlt]])}>
            <Link to={banner.buttonLinkAlt || ""}>
                {banner.buttonTextAlt}
            </Link>
        </div>}
        <Link to={banner.link}>
            <BannerImage bannerId={banner.id} />
        </Link>
    </div>
);
