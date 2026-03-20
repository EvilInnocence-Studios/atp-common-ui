export declare interface ITiktokProps {

}

// What gets passed into the component from the parent as attributes
export declare interface ITiktokInputProps {
    className?: string;
    css?: string;
    classes?: any;
    slots?: Index<ILayoutComponent[]>;
    __layoutId?: string;
    handle?: string;
}

export type TiktokProps = ITiktokInputProps & ITiktokProps;
