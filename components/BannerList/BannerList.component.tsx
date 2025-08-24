import { IBanner } from "@common-shared/banner/types";
import { Fader } from "@core/components/Fader";
import { Col, Spin } from "antd";
import { objMap, pipe } from "ts-functional";
import { Index } from "ts-functional/dist/types";
import { Banner } from "../Banner/Banner.container";
import { BannerListProps } from "./BannerList.d";
import styles from './BannerList.module.scss';

// Group banners by order value
const groupBanners = (banners: IBanner[]):Index<IBanner[]> => banners.reduce(
    (acc:Index<IBanner[]>, banner:IBanner) => {
        const key = `${banner.order}`;
        return {...acc, [key]: [...acc[key] || [], banner]};
    },
    {}
);

const renderBanners = (lg:number) => (banners:IBanner[], order:string) => <Col lg={lg} xs={24} key={order} className={styles.hero}>
    <Fader interval={5}>
        {banners.map(banner => <Banner key={banner.id} banner={banner} />)}
    </Fader>
</Col>;

const valuesByOrder = (elements:Index<JSX.Element>) => Object.keys(elements).sort().map(key => elements[key]);

const mapBanners = (lg:number) => pipe(groupBanners, objMap(renderBanners(lg)), valuesByOrder);

export const BannerListComponent = ({banners, columns, isLoading}:BannerListProps) =><Spin spinning={isLoading}>
    {mapBanners(24 / columns)(banners)}
</Spin>;
