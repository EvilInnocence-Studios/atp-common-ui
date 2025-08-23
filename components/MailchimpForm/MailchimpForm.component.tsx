import Mailchimp from 'react-mailchimp-form';
import { MailchimpFormProps } from "./MailchimpForm.d";

export const MailchimpFormComponent = ({}:MailchimpFormProps) => <>
    <h2>Subscribe to our Newsletter!</h2>
    <h3>Get notified when we have new products and sales!</h3>
    <Mailchimp
        action="https://evilinnocence.us2.list-manage.com/subscribe/post?u=013c705dc4ca956f29786a8a6&id=db5c0569da&f_id=0010fce3f0"
        fields={[{
            name: 'EMAIL',
            placeholder: 'Email',
            type: 'email',
            required: true
        }]}
    />
</>
