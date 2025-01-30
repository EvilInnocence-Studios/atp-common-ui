import { Button } from "antd";
import { BannerImage } from "../BannerImage";
import {BannerProps} from "./Banner.d";
import styles from './Banner.module.scss';
import clsx from "clsx";
import { Link } from "react-router";

export const BannerComponent = ({banner}:BannerProps) => 
    <div className={styles.banner}>
        <Link to={banner.link}>
            <div className={styles.info}>
                <h1>{banner.title}</h1>
                <p>{banner.description}</p>
            </div>
        </Link>
        {!!banner.buttonText && <div className={clsx([styles.button, banner.buttonLocation && styles[banner.buttonLocation]])}>
            <Link to={banner.buttonLink || ""}>
                <Button type="primary" size="large">
                    {banner.buttonText}
                </Button>
            </Link>
        </div>}
        {!!banner.buttonTextAlt && <div className={clsx([styles.button, banner.buttonLocationAlt && styles[banner.buttonLocationAlt]])}>
            <Link to={banner.buttonLinkAlt || ""}>
                <Button type="primary" size="large">
                    {banner.buttonTextAlt}
                </Button>
            </Link>
        </div>}
        <Link to={banner.link}>
            <BannerImage bannerId={banner.id} />
        </Link>
    </div>;
