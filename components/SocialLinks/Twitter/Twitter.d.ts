export declare interface ITwitterProps {

}

// What gets passed into the component from the parent as attributes
export declare interface ITwitterInputProps {
    className?: string;
    css?: string;
    classes?: any;
    slots?: Index<ILayoutComponent[]>;
    __layoutId?: string;
    handle?: string;
}

export type TwitterProps = ITwitterInputProps & ITwitterProps;
