import { DeleteBtn } from "@core/components/DeleteBtn";
import { Editable } from "@core/components/Editable";
import { Label } from "@core/components/Label";
import { onDateChange } from "@core/lib/onInputChange";
import { DatePicker, InputNumber, Radio, Spin, Tabs, Upload } from "antd";
import dayjs from "dayjs";
import { BannerImage } from "../BannerImage";
import { BannerEditorProps } from "./BannerEditor.d";
import styles from './BannerEditor.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { overridable } from "@core/lib/overridable";

export const BannerEditorComponent = overridable(({ bannerId, banner, isLoading, upload, updateString, updateNumber, UpdateButtons, remove, classes = styles }: BannerEditorProps) =>
    <Spin spinning={isLoading}>
        <div className={classes.bannerEditor}>
            <div className={classes.updateButtons}><UpdateButtons /></div>
            <BannerImage bannerId={bannerId} />
            <Upload.Dragger customRequest={({ file }) => upload(file as File)} showUploadList={false}>
                <FontAwesomeIcon icon={faRefresh} /> Replace image
            </Upload.Dragger>
            <Tabs tabBarExtraContent={<DeleteBtn entityType="banner" onClick={remove} />}>
                <Tabs.TabPane key="1" tab="Details">
                    <Label label="Name"><Editable value={banner.name} onChange={updateString("name")} /></Label>
                    <Label label="Title"><Editable value={banner.title} onChange={updateString("title")} /></Label>
                    <Label label="Tag"><Editable value={banner.tag} onChange={updateString("tag")} /></Label>
                    <Label label="Description"><Editable value={banner.description} onChange={updateString("description")} /></Label>
                    <Label label="Image Link"><Editable value={banner.link} onChange={updateString("link")} /></Label>
                    <Label label="Order"><InputNumber value={banner.order} onChange={updateNumber("order")} /></Label>
                </Tabs.TabPane>
                <Tabs.TabPane key="2" tab="Button 1">
                    <Label label="Text"><Editable value={banner.buttonText || ""} onChange={updateString("buttonText")} /></Label>
                    <Label label="Link"><Editable value={banner.buttonLink || ""} onChange={updateString("buttonLink")} /></Label>
                    <Radio.Group block optionType="button" buttonStyle="solid" value={banner.buttonLocation} onChange={(e) => updateString("buttonLocation")(e.target.value)}>
                        <Radio value="left">Left</Radio>
                        <Radio value="center">Center</Radio>
                        <Radio value="right">Right</Radio>
                    </Radio.Group>
                </Tabs.TabPane>
                <Tabs.TabPane key="3" tab="Button 2">
                    <Label label="Text"><Editable value={banner.buttonTextAlt || ""} onChange={updateString("buttonTextAlt")} /></Label>
                    <Label label="Link"><Editable value={banner.buttonLinkAlt || ""} onChange={updateString("buttonLinkAlt")} /></Label>
                    <Radio.Group block optionType="button" buttonStyle="solid" value={banner.buttonLocationAlt} onChange={(e) => updateString("buttonLocationAlt")(e.target.value)}>
                        <Radio value="left">Left</Radio>
                        <Radio value="center">Center</Radio>
                        <Radio value="right">Right</Radio>
                    </Radio.Group>
                </Tabs.TabPane>
                <Tabs.TabPane key="4" tab="Active">
                    <Label label="Active From">
                        <DatePicker value={banner.activeFrom ? dayjs(banner.activeFrom) : undefined} onChange={onDateChange(updateString("activeFrom"))} />
                    </Label>
                    <Label label="Active To">
                        <DatePicker value={banner.activeTo ? dayjs(banner.activeTo) : undefined} onChange={onDateChange(updateString("activeTo"))} />
                    </Label>
                </Tabs.TabPane>
            </Tabs>
        </div>
    </Spin>
);
