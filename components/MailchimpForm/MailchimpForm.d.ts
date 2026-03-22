export declare interface IMailchimpFormProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IMailchimpFormInputProps {
    className?: string;
    css?: string;
    classes?: any;
    slots?: Index<ILayoutComponent[]>;
    __layoutId?: string;
    action?: string;
}

export type MailchimpFormProps = IMailchimpFormInputProps & IMailchimpFormProps;
