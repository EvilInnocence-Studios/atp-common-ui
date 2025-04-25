import { ISettingDescriptor, ISettingsModule, ISettingsScreen } from "@common/lib/setting/types";
import { config } from "@config";
import { Editable } from "@core/components/Editable";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Select, Tabs } from "antd";
import { objMap } from "ts-functional";
import { SettingsManagerProps } from "./SettingsManager.d";
import styles from './SettingsManager.module.scss';
import { Label } from "@core/components/Label";

export const SettingsManagerComponent = ({settings, update}:SettingsManagerProps) =>
    <div className={styles.settingsManager}>
        <h1><FontAwesomeIcon icon={faGear} /> Settings</h1>
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
                                {type === "boolean" && <Checkbox
                                    title={displayName}
                                    checked={settings[settingName]?.value === "true"}
                                />}
                                {type === "select" && <>
                                    <label>{displayName}</label>
                                    <Select value={settings[settingName]?.value} onChange={update(settingName)}>
                                        {options?.map(option => <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>)}
                                    </Select>
                                </>}
                                {description && <p>{description}</p>}
                            </div>;
                        })(screen))}
                    </Tabs.TabPane>)(module))}
                </Tabs>
            </Tabs.TabPane>)(config().settings))}
        </Tabs>
    </div>;
