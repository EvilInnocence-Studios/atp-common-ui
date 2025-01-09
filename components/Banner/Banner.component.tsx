import { Button } from "antd";
import { BannerImage } from "../BannerImage";
import {BannerProps} from "./Banner.d";
import styles from './Banner.module.scss';
import clsx from "clsx";

export const BannerComponent = ({banner}:BannerProps) => 
    <div className={styles.banner}>
        <div className={styles.info}>
            <h1>{banner.title}</h1>
            <p>{banner.description}</p>
        </div>
        {!!banner.buttonText && <div className={clsx([styles.button, banner.buttonLocation && styles[banner.buttonLocation]])}>
            <Button type="primary" size="large">
                {banner.buttonText}
            </Button>
        </div>}
        <BannerImage bannerId={banner.id} />
    </div>;
