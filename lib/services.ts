import { IMethods } from "@core/lib/types";
import { bannerServices } from "./banner/services";
import { synonymServices } from "./synonym/services";
import { tagGroupServices } from "./tag/services";
import { settingServices } from "./setting/services";
import { getResults } from "@core/lib/util";
import { linkServices } from "./link/services";

export const commonServices = (methods:IMethods) => ({
    ...tagGroupServices(methods),
    ...synonymServices(methods),
    ...bannerServices(methods),
    ...settingServices(methods),
    ...linkServices(methods),
    cache: {
        clear: (cacheType:string) => methods.post(`cache/${cacheType}`),
    },
    errorReport: (message:string, data:any) => methods.post("errorReport", {...data, message}).then(getResults),
});