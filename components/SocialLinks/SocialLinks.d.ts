export declare interface ISocialLinksProps {
    facebook: string;
    twitter: string;
    blueSky: string;
    instagram: string;
    siteName: string;
}

// What gets passed into the component from the parent as attributes
export declare interface ISocialLinksInputProps {

}

export type SocialLinksProps = ISocialLinksInputProps & ISocialLinksProps;