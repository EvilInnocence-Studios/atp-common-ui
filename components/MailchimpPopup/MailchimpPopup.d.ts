import { ILayoutComponent } from "@theming/lib/layout/componentRegistry";

export declare interface IMailchimpPopupProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IMailchimpPopupInputProps {
    slots?: Index<ILayoutComponent[]>;
    __layoutId?: string;
    mailchimpScript?: string;
}

export type MailchimpPopupProps = IMailchimpPopupInputProps & IMailchimpPopupProps;
