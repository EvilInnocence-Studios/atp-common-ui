import { createInjector, inject, mergeProps } from "unstateless";
import {ClearCacheButtonComponent} from "./ClearCacheButton.component";
import {IClearCacheButtonInputProps, ClearCacheButtonProps, IClearCacheButtonProps} from "./ClearCacheButton.d";
import { useLoaderAsync } from "@core/lib/useLoader";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";

const injectClearCacheButtonProps = createInjector(({cacheType}:IClearCacheButtonInputProps):IClearCacheButtonProps => {
    const loader = useLoaderAsync();

    const onClick = () => {
        loader(() => Promise.all(cacheType.split(",")
            .map(ct => ct.trim())
            .filter(ct => ct.length > 0)
            .map(ct =>
                services().cache.clear(ct)
                    .then(flash.success(`Cache '${ct}' cleared`))
            ))
        );
    }

    const clearAll = () => {
        loader(() =>
            services().cache.clear("all")
                .then(flash.success(`All caches cleared`))
        );
    }
    
    return {onClick, isLoading: loader.isLoading, clearAll};
});

const connect = inject<IClearCacheButtonInputProps, ClearCacheButtonProps>(mergeProps(
    injectClearCacheButtonProps,
));

export const ClearCacheButton = connect(ClearCacheButtonComponent);
