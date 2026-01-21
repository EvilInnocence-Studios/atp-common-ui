export declare interface IRoutedCMSPageProps {
    slug: string;
}

// What gets passed into the component from the parent as attributes
export declare interface IRoutedCMSPageInputProps {
    className?: string;
    css?: string;
    classes?: any;
    slots?: Index<ILayoutComponent[]>;
    __layoutId?: string;
}

export type RoutedCMSPageProps = IRoutedCMSPageInputProps & IRoutedCMSPageProps;
