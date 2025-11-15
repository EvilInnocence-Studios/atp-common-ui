import { ISettingDescriptor, ISettingsModule, ISettingsScreen } from "@common/lib/setting/types";
import { config } from "@config";
import { AsyncSelect } from "@core/components/AsyncSelect";
import { Editable } from "@core/components/Editable";
import { Label } from "@core/components/Label";
import { onCheckboxChange } from "@core/lib/onInputChange";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, ColorPicker, Tabs } from "antd";
import { objMap } from "ts-functional";
import { SettingsManagerProps } from "./SettingsManager.d";
import styles from './SettingsManager.module.scss';
import { ClearCacheButton } from "../ClearCacheButton";
import { overridable } from "@core/lib/overridable";

export const SettingsManagerComponent = overridable(({settings, update}:SettingsManagerProps) =>
    <div className={styles.settingsManager}>
        <h1><FontAwesomeIcon icon={faGear} /> Settings</h1>
        <ClearCacheButton entity="settings" cacheType="setting" />
        <br/><br/>
        <Tabs tabPosition="left" defaultActiveKey="0">
            {Object.values(objMap((module:ISettingsModule, moduleName:string) => <Tabs.TabPane
                key={moduleName}
                tab={moduleName}
            >
                <Tabs>
                    {Object.values(objMap((screen:ISettingsScreen, screenName:string) => <Tabs.TabPane
                        key={screenName}
                        tab={screenName}
                    >
                        {Object.values(objMap((setting:ISettingDescriptor, settingName:string) => {
                            const { displayName, type, defaultValue, description, options } = setting;
                            return <div className={styles.setting} key={settingName} title={settingName}>
                                {["string", "integer", "decimal"].includes(type) && <Label label={displayName}><Editable
                                    placeholder={defaultValue}
                                    value={settings[settingName]?.value}
                                    onChange={update(settingName)}
                                /></Label>}
                                {type === "color" && <Label className={styles.colorPicker} label={displayName}>
                                    <ColorPicker
                                        value={settings[settingName]?.value || defaultValue}
                                        onChange={color => update(settingName)(color.toHexString())}
                                        placement="topRight"
                                    />
                                    <Editable
                                        placeholder={defaultValue}
                                        value={settings[settingName]?.value}
                                        onChange={update(settingName)}
                                    />
                                </Label>}
                                {type === "boolean" && <Checkbox
                                    title={displayName}
                                    checked={settings[settingName]?.value === "true"}
                                    onChange={onCheckboxChange(update(settingName), "true", "false")}
                                    value={settings[settingName]?.value === "true" ? "false" : "true"}
                                />}
                                {type === "select" && !!options && <>
                                    <Label label={displayName}>
                                        <AsyncSelect value={settings[settingName]?.value} onChange={update(settingName)} getOptions={options} />
                                    </Label>
                                </>}
                                {description && <p>{description}</p>}
                            </div>;
                        })(screen))}
                    </Tabs.TabPane>)(module))}
                </Tabs>
            </Tabs.TabPane>)(config().settings))}
        </Tabs>
    </div>
);
