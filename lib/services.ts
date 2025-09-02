import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { bannerServices } from "./banner/services";
import { contentServices } from "./content/services";
import { linkServices } from "./link/services";
import { mediaServices } from "./media/services";
import { settingServices } from "./setting/services";
import { synonymServices } from "./synonym/services";
import { tagGroupServices } from "./tag/services";

export const commonServices = (methods:IMethods) => ({
    ...tagGroupServices(methods),
    ...synonymServices(methods),
    ...bannerServices(methods),
    ...settingServices(methods),
    ...linkServices(methods),
    ...contentServices(methods),
    ...mediaServices(methods),
    cache: {
        clear: (cacheType:string) => methods.post(`cache/${cacheType}`),
    },
    errorReport: (message:string, data:any) => methods.post("errorReport", {...data, message}).then(getResults),
});