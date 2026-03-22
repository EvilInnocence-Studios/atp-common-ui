import { Label } from "@core/components/Label";
import { IMailchimpFormInputProps } from "./MailchimpForm.d";
import { Editable } from "@core/components/Editable";

export const MailchimpFormPropEditor = (
    {action}: IMailchimpFormInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    return (
        <Label label="Action URL">
            <Editable
                value={action || ""}
                onChange={updateProp("action")}
            />
        </Label>
    );
}
