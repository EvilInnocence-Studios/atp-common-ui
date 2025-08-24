import Mailchimp from 'react-mailchimp-form';
import { MailchimpFormProps } from "./MailchimpForm.d";
import { Setting } from '../Setting';

export const MailchimpFormComponent = ({action}:MailchimpFormProps) => <>
    <h2><Setting id="mailchimpFormHeader" /></h2>
    <h3><Setting id="mailchimpFormTagline" /></h3>
    <Mailchimp
        action={action}
        fields={[{
            name: 'EMAIL',
            placeholder: 'Email',
            type: 'email',
            required: true
        }]}
    />
</>
