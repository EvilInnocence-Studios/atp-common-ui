import { useSetting } from "@common/lib/setting/services";
import { overridable } from "@core/lib/overridable";
import { useScript } from "@core/lib/useScript";
import { createInjector, inject, mergeProps } from "unstateless";
import { MailchimpPopupComponent } from "./MailchimpPopup.component";
import { IMailchimpPopupInputProps, IMailchimpPopupProps, MailchimpPopupProps } from "./MailchimpPopup.d";

const injectMailchimpPopupProps = createInjector(({}:IMailchimpPopupInputProps):IMailchimpPopupProps => {
    const mailchimpScript = useSetting("mailchimpPopupScript");
    useScript(mailchimpScript);

    return {};
});

const connect = inject<IMailchimpPopupInputProps, MailchimpPopupProps>(mergeProps(
    injectMailchimpPopupProps,
));
export const connectMailchimpPopup = connect;

export const MailchimpPopup = overridable<IMailchimpPopupInputProps>(connect(MailchimpPopupComponent));
