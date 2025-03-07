import { createInjector, inject, mergeProps } from "unstateless";
import {ClearCacheButtonComponent} from "./ClearCacheButton.component";
import {IClearCacheButtonInputProps, ClearCacheButtonProps, IClearCacheButtonProps} from "./ClearCacheButton.d";
import { useLoaderAsync } from "@core/lib/useLoader";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";

const injectClearCacheButtonProps = createInjector(({cacheType}:IClearCacheButtonInputProps):IClearCacheButtonProps => {
    const loader = useLoaderAsync();

    const onClick = () => {
        loader(() => 
            services().cache.clear(cacheType)
                .then(flash.success(`Cache '${cacheType}' cleared`))
        );
    }
    
    return {onClick, isLoading: loader.isLoading};
});

const connect = inject<IClearCacheButtonInputProps, ClearCacheButtonProps>(mergeProps(
    injectClearCacheButtonProps,
));

export const ClearCacheButton = connect(ClearCacheButtonComponent);
