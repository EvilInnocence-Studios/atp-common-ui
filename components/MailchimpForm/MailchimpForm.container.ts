import { createInjector, inject, mergeProps } from "unstateless";
import {MailchimpFormComponent} from "./MailchimpForm.component";
import {IMailchimpFormInputProps, MailchimpFormProps, IMailchimpFormProps} from "./MailchimpForm.d";
import { overridable } from "@core/lib/overridable";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import icon from './icon.svg';
import { MailchimpFormPropEditor } from "./MailchimpForm.props";

const injectMailchimpFormProps = createInjector(({}:IMailchimpFormInputProps):IMailchimpFormProps => {
    return {};
});

const connect = inject<IMailchimpFormInputProps, MailchimpFormProps>(mergeProps(
    injectMailchimpFormProps,
));
export const connectMailchimpForm = connect;

export const MailchimpForm = withLayoutMetadata(
    overridable<IMailchimpFormInputProps>(connect(MailchimpFormComponent)),
    {
        name: "MailchimpForm",
        displayName: "Mailchimp Form",
        category: "Marketing",
        subCategory: "Email",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        propEditor: MailchimpFormPropEditor,
    }
);
