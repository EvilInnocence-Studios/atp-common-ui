import { overridable } from "@core/lib/overridable";
import Mailchimp from 'react-mailchimp-form';
import { MailchimpFormProps } from "./MailchimpForm.d";

export const MailchimpFormComponent = overridable(({className, css, action}:MailchimpFormProps) => <>
    {css && <style>{css}</style>}
    <div className={className}>
        <Mailchimp
            action={action}
            fields={[{
                name: 'EMAIL',
                placeholder: 'Email',
                type: 'email',
                required: true
            }]}
        />
    </div>
</>);

