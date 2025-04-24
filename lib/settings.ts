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
            google: {
                displayName: "Google Analytics Tracking ID",
                type: "string",
                defaultValue: "",
            },
            track: {
                displayName: "Custom Analytics Tracking URL",
                type: "string",
                defaultValue: "",
                description: "The full URL for the custom analytics tracking endpoint.",
            },
            debug: {
                displayName: "Debug Mode",
                type: "boolean",
                defaultValue: false,
                description: "Enable debug mode for the custom analytics",
            }
        },
        "Email": {
            support: {
                displayName: "Support Email",
                type: "string",
                defaultValue: "",
                description: "The support email address for the site.",
            }
        },
    },
    "Social": {
        "Handles": {
            facebook: {
                displayName: "Facebook Page URL",
                type: "string",
                defaultValue: "",
            },
            twitter: {
                displayName: "Twitter Handle",
                type: "string",
                defaultValue: "",
            },
            blueSky: {
                displayName: "BlueSky Handle",
                type: "string",
                defaultValue: "",
            },
            instagram: {
                displayName: "Instagram Handle",
                type: "string",
                defaultValue: "",
            }
        }
    },
    "Ecommerce": {
        "Paypal": {
            clientId: {
                displayName: "Paypal Client ID",
                type: "string",
                defaultValue: "",
            },
        },
    },
}
