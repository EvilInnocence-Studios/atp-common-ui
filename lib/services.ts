import { IMethods } from "@core/lib/types";
import { synonymServices } from "./synonym/services";
import { tagGroupServices } from "./tag/services";

export const commonServices = (methods:IMethods) => ({
    ...tagGroupServices(methods),
    ...synonymServices(methods),
});