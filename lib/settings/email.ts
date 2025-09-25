import { ISettingsModule } from "../setting/types";

export const emailSettings:ISettingsModule = {
    "Email": {
        supportEmail: {
            displayName: "Support Email",
            type: "string",
            defaultValue: "",
            description: "The support email address for the site.",
        }
    },
}