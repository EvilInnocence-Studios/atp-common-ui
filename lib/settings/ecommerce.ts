import { ISettingsModule } from "../setting/types";

export const ecommerceSettings:ISettingsModule = {
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
};
