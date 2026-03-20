export declare interface IBlueskyProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IBlueskyInputProps {
    className?: string;
    css?: string;
    classes?: any;
    slots?: Index<ILayoutComponent[]>;
    __layoutId?: string;
    handle?:string;
}

export type BlueskyProps = IBlueskyInputProps & IBlueskyProps;
