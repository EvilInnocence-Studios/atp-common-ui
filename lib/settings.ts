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
        }
    },
    "Ecommerce": {
        "Paypal": {
            paypalClientId: {
                displayName: "Paypal Client ID",
                type: "string",
                defaultValue: "",
            },
        },
    },
}
