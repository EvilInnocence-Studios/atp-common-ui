import { ISettingsModule } from "../setting/types";

export const contentSettings:ISettingsModule = {
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
};
