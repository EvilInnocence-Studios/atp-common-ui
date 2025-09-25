import { ISettingsModule } from "../setting/types";

export const analyticsSettings:ISettingsModule = {
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
};
