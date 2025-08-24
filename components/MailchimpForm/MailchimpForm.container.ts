import { createInjector, inject, mergeProps } from "unstateless";
import {MailchimpFormComponent} from "./MailchimpForm.component";
import {IMailchimpFormInputProps, MailchimpFormProps, IMailchimpFormProps} from "./MailchimpForm.d";
import { useSetting } from "@common/lib/setting/services";

const injectMailchimpFormProps = createInjector(({}:IMailchimpFormInputProps):IMailchimpFormProps => {
    const action = useSetting("mailchimpFormAction");

    return {action};
});

const connect = inject<IMailchimpFormInputProps, MailchimpFormProps>(mergeProps(
    injectMailchimpFormProps,
));

export const MailchimpForm = connect(MailchimpFormComponent);
