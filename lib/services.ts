import { IMethods } from "@core/lib/types";
import { bannerServices } from "./banner/services";
import { synonymServices } from "./synonym/services";
import { tagGroupServices } from "./tag/services";
import { settingServices } from "./setting/services";

export const commonServices = (methods:IMethods) => ({
    ...tagGroupServices(methods),
    ...synonymServices(methods),
    ...bannerServices(methods),
    ...settingServices(methods),
    cache: {
        clear: (cacheType:string) => methods.post(`cache/${cacheType}`),
    }
});