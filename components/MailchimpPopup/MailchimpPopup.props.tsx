import { Editable } from "@core/components/Editable";
import { Label } from "@core/components/Label";
import { IMailchimpPopupInputProps } from "./MailchimpPopup.d";

export const MailchimpPopupPropEditor = (
    {mailchimpScript}: IMailchimpPopupInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    return <>
        <Label label="Mailchimp Script" >
            <Editable 
                value={mailchimpScript || ""}
                onChange={updateProp("mailchimpScript")}
            />
        </Label>
    </>;
}
