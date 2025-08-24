import { Setting } from "../Setting";
import { CopyrightProps } from "./Copyright.d";

export const CopyrightComponent = ({}:CopyrightProps) =>
    <p>&copy; {new Date().getFullYear()} <Setting id="siteName" />, all rights reserved.</p>;
