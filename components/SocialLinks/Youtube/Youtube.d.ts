export declare interface IYoutubeProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IYoutubeInputProps {
    className?: string;
    css?: string;
    classes?: any;
    slots?: Index<ILayoutComponent[]>;
    __layoutId?: string;
    handle?: string;
}

export type YoutubeProps = IYoutubeInputProps & IYoutubeProps;
