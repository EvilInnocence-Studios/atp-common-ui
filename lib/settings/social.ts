import { ISettingsModule } from "../setting/types";

export const socialSettings:ISettingsModule = {
    "Handles": {
        facebookPage: {
            displayName: "Facebook Page URL",
            type: "string",
            defaultValue: "",
        },
        twitterHandle: {
            displayName: "Twitter Handle",
            type: "string",
            defaultValue: "",
        },
        blueSkyHandle: {
            displayName: "BlueSky Handle",
            type: "string",
            defaultValue: "",
        },
        instagramHandle: {
            displayName: "Instagram Handle",
            type: "string",
            defaultValue: "",
        },
        patreonHandle: {
            displayName: "Patreon Handle",
            type: "string",
            defaultValue: "",
        },
        youtubeChannel: {
            displayName: "YouTube Channel URL",
            type: "string",
            defaultValue: "",
        },
        tikTokHandle: {
            displayName: "TikTok Handle",
            type: "string",
            defaultValue: "",
        },
        kofiHandle: {
            displayName: "Ko-fi Handle",
            type: "string",
            defaultValue: "",
        },
    },
    "Mailchimp": {
        mailchimpFormHeader: {
            displayName: "Mailchimp Form Header",
            type: "string",
            defaultValue: "",
            description: "The header text for the Mailchimp form.",
        },
        mailchimpFormTagline: {
            displayName: "Mailchimp Form Tagline",
            type: "string",
            defaultValue: "",
            description: "The tagline text for the Mailchimp form.",
        },
        mailchimpFormAction: {
            displayName: "Mailchimp Form Action URL",
            type: "string",
            defaultValue: "",
            description: "The action URL for the Mailchimp form. This is the URL to which the form submits data.",
        },
        mailchimpPopupScript: {
            displayName: "Mailchimp Popup Script URL",
            type: "string",
            defaultValue: "",
            description: "The URL for the Mailchimp popup script. This is used to load the Mailchimp popup form.",
        }
    }
};