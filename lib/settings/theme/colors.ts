import { ISettingsModule } from "@common/lib/setting/types";

export const colorSettings:ISettingsModule = {
    "Colors": {
        "theme.primaryColor": {
            displayName: "Primary Brand Color",
            type: "color",
            defaultValue: "#000000",
            description: "The primary color used for the brand.",
        },
        "theme.secondaryColor": {
            displayName: "Secondary Brand Color",
            type: "color",
            defaultValue: "#FFFFFF",
            description: "The secondary color used for the brand.",
        },
        "theme.borderColor": {
            displayName: "Border Color",
            type: "color",
            defaultValue: "#CCCCCC",
            description: "The border color for bordered elements.",
        },
        "theme.bgColor": {
            displayName: "Brand Background Color",
            type: "color",
            defaultValue: "#1A1A1A",
            description: "The background color used for the brand.",
        },
        "theme.bgLightColor": {
            displayName: "Brand Light Background Color",
            type: "color",
            defaultValue: "#2A2A2A",
            description: "A lighter background color used for the brand.",
        },
        "theme.textColor": {
            displayName: "Brand Text Color",
            type: "color",
            defaultValue: "#E0E0E0",
            description: "The text color used for the brand.",
        },
        "theme.warningColor": {
            displayName: "Warning Color",
            type: "color",
            defaultValue: "#FFA500",
            description: "The color used for warnings.",
        },
        "theme.errorColor": {
            displayName: "Error Color",
            type: "color",
            defaultValue: "#FF0000",
            description: "The color used for errors.",
        },
        "theme.successColor": {
            displayName: "Success Color",
            type: "color",
            defaultValue: "#00FF00",
            description: "The color used for success messages.",
        },
        "theme.changedColor": {
            displayName: "Changed Color",
            type: "color",
            defaultValue: "#00FF00",
            description: "The color used for values that have been changed.",
        },
        "theme.headerMenuBg": {
            displayName: "Header Menu Background Color",
            type: "color",
            defaultValue: "#000000",
            description: "The background color of the header menu.",
        },
        "theme.contentBg": {
            displayName: "Content Background Color",
            type: "color",
            defaultValue: "#121212",
            description: "The background color of the main content area.",
        },
        "theme.pageBg": {
            displayName: "Page Background Color",
            type: "color",
            defaultValue: "#1A1A1A",
            description: "The background color of the entire page.",
        }
    }
}