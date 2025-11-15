import { useSetting } from "@common/lib/setting/services";
import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { MailchimpFormComponent } from "./MailchimpForm.component";
import { IMailchimpFormInputProps, IMailchimpFormProps, MailchimpFormProps } from "./MailchimpForm.d";

const injectMailchimpFormProps = createInjector(({}:IMailchimpFormInputProps):IMailchimpFormProps => {
    const action = useSetting("mailchimpFormAction");

    return {action};
});

const connect = inject<IMailchimpFormInputProps, MailchimpFormProps>(mergeProps(
    injectMailchimpFormProps,
));
export const connectMailchimpForm = connect;

export const MailchimpForm = overridable<IMailchimpFormInputProps>(connect(MailchimpFormComponent));
