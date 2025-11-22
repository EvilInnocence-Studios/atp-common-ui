import clsx from "clsx";
import { Link } from "react-router";
import { BannerImage } from "../BannerImage";
import { BannerProps } from "./Banner.d";
import styles from './Banner.module.scss';
import { overridable } from "@core/lib/overridable";

export const BannerComponent = overridable(({ banner, className, classes = styles }: BannerProps) =>
    <div className={clsx([classes.banner, className])}>
        <Link to={banner.link}>
            <div className={classes.info}>
                <h1>{banner.title}</h1>
                <p>{banner.description}</p>
            </div>
        </Link>
        {!!banner.buttonText && <div className={clsx([classes.button, banner.buttonLocation && classes[banner.buttonLocation]])}>
            <Link to={banner.buttonLink || ""}>
                {banner.buttonText}
            </Link>
        </div>}
        {!!banner.buttonTextAlt && <div className={clsx([classes.button, banner.buttonLocationAlt && classes[banner.buttonLocationAlt]])}>
            <Link to={banner.buttonLinkAlt || ""}>
                {banner.buttonTextAlt}
            </Link>
        </div>}
        <Link to={banner.link}>
            <BannerImage bannerId={banner.id} />
        </Link>
    </div>
);
