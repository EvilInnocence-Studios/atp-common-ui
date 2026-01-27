import { ISettingsModule } from "../setting/types";

export const siteInfoSettings:ISettingsModule = {
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
        },
        siteLogoUrl: {
            displayName: "Site Logo URL",
            type: "string",
            defaultValue: "",
            description: "The logo used for the site, shown in the header and emails.",
        },
        spinnerImageUrl: {
            displayName: "Spinner Image URL",
            type: "string",
            defaultValue: "",
            description: "The image used for loading spinners.",
        }
    },
}