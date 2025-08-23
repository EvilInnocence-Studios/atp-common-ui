import { createInjector, inject, mergeProps } from "unstateless";
import {MailchimpFormComponent} from "./MailchimpForm.component";
import {IMailchimpFormInputProps, MailchimpFormProps, IMailchimpFormProps} from "./MailchimpForm.d";

const injectMailchimpFormProps = createInjector(({}:IMailchimpFormInputProps):IMailchimpFormProps => {
    return {};
});

const connect = inject<IMailchimpFormInputProps, MailchimpFormProps>(mergeProps(
    injectMailchimpFormProps,
));

export const MailchimpForm = connect(MailchimpFormComponent);
