import { DatePicker, Radio, Spin } from "antd";
import {BannerEditorProps} from "./BannerEditor.d";
import styles from './BannerEditor.module.scss';
import { Editable } from "@core/components/Editable";
import { BannerImage } from "../BannerImage";
import { Label } from "@core/components/Label";
import dayjs from "dayjs";
import { onDateChange } from "@core/lib/onInputChange";

export const BannerEditorComponent = ({bannerId, banner, isLoading, updateString, UpdateButtons}:BannerEditorProps) =>
    <Spin spinning={isLoading}>
        <div className={styles.bannerEditor}>
            <div className={styles.updateButtons}><UpdateButtons /></div>
            <BannerImage bannerId={bannerId} />
            <Label label="Name"><Editable value={banner.name} onChange={updateString("name")}/></Label>
            <Label label="Title"><Editable value={banner.title} onChange={updateString("title")}/></Label>
            <Label label="Tag"><Editable value={banner.tag} onChange={updateString("tag")}/></Label>
            <Label label="Description"><Editable value={banner.description} onChange={updateString("description")}/></Label>
            <Label label="Active From">
                <DatePicker value={banner.activeFrom ? dayjs(banner.activeFrom) : undefined} onChange={onDateChange(updateString("activeFrom"))}/>
            </Label>
            <Label label="Active To">
                <DatePicker value={banner.activeTo ? dayjs(banner.activeTo) : undefined} onChange={onDateChange(updateString("activeTo"))}/>
            </Label>
            <Label label="Button Text"><Editable value={banner.buttonText || ""} onChange={updateString("buttonText")}/></Label>
            <Label label="Link"><Editable value={banner.link} onChange={updateString("link")}/></Label>
            <Radio.Group block optionType="button" buttonStyle="solid" value={banner.buttonLocation} onChange={(e) => updateString("buttonLocation")(e.target.value)}>
                <Radio value="left">Left</Radio>
                <Radio value="center">Center</Radio>
                <Radio value="right">Right</Radio>
            </Radio.Group>
        </div>
    </Spin>;
