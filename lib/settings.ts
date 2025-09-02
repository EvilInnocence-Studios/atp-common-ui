import { ISettingContainer } from "./setting/types";

export const commonSettings:ISettingContainer = {
    "General": {
        "Site Info": {
            siteName: {
                displayName: "Site Name",
                type: "string",
                defaultValue: "My Site Name",
                description: "The name of the site as it appears in emails and other communications.",
            },
            adminAppName: {
                displayName: "Admin App Name",
                type: "string",
                defaultValue: "Admin",
                description: "The name of the admin app as it appears in the admin app.",
            },
            publicAppName: {
                displayName: "Public App Name",
                type: "string",
                defaultValue: "Public",
                description: "The name of the public app as it appears in the public app.",
            },
            imageHost: {
                displayName: "Image Host URL",
                type: "string",
                defaultValue: "",
                description: "The base URL for the image host. This is used to serve images from a CDN or external storage.",
            }
        },
        "Analytics": {
            googleTrackingId: {
                displayName: "Google Analytics Tracking ID",
                type: "string",
                defaultValue: "",
            },
            trackingUrl: {
                displayName: "Custom Analytics Tracking URL",
                type: "string",
                defaultValue: "",
                description: "The full URL for the custom analytics tracking endpoint.",
            },
            analyticsDebug: {
                displayName: "Debug Mode",
                type: "boolean",
                defaultValue: false,
                description: "Enable debug mode for the custom analytics",
            }
        },
        "Email": {
            supportEmail: {
                displayName: "Support Email",
                type: "string",
                defaultValue: "",
                description: "The support email address for the site.",
            }
        },
    },
    "Content": {
        "Banners": {
            bannerImageFolder: {
                displayName: "Banner Image Folder",
                type: "string",
                defaultValue: "",
                description: "The folder where banner images are stored.",
            },
        },
        "Media": {
            mediaImageFolder: {
                displayName: "Media Image Folder",
                type: "string",
                defaultValue: "",
                description: "The folder where media images are stored.",
            },
        },
    },
    "Social": {
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
            }
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
    },
    "Ecommerce": {
        "Paypal": {
            paypalClientId: {
                displayName: "Paypal Client ID",
                type: "string",
                defaultValue: "",
            },
            paypalClientSecret: {
                displayName: "Paypal Client Secret",
                type: "string",
                defaultValue: "",
            }
        },
    },
}
