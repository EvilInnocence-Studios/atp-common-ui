import { createInjector, inject, mergeProps } from "unstateless";
import {MailchimpPopupComponent} from "./MailchimpPopup.component";
import {IMailchimpPopupInputProps, MailchimpPopupProps, IMailchimpPopupProps} from "./MailchimpPopup.d";
import { overridable } from "@core/lib/overridable";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import icon from './icon.svg';
import { MailchimpPopupLayoutEditor } from "./MailchimpPopup.layout";
import { MailchimpPopupPropEditor } from "./MailchimpPopup.props";
import { useScript } from "@core/lib/useScript";

const injectMailchimpPopupProps = createInjector(({mailchimpScript}:IMailchimpPopupInputProps):IMailchimpPopupProps => {
    useScript(mailchimpScript!);

    return {};
});

const connect = inject<IMailchimpPopupInputProps, MailchimpPopupProps>(mergeProps(
    injectMailchimpPopupProps,
));
export const connectMailchimpPopup = connect;

export const MailchimpPopup = withLayoutMetadata(
    overridable<IMailchimpPopupInputProps>(connect(MailchimpPopupComponent)),
    {
        name: "MailchimpPopup",
        displayName: "MailchimpPopup",
        category: "Marketing",
        subCategory: "Email",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        layoutEditor: MailchimpPopupLayoutEditor,
        propEditor: MailchimpPopupPropEditor,
    }
);
