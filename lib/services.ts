import { IMethods } from "@core/lib/types";
import { tagGroupServices } from "./tag/services";

export const commonServices = (methods:IMethods) => ({
    ...tagGroupServices(methods),
});