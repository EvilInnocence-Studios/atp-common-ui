export declare interface IKofiProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IKofiInputProps {
    className?: string;
    css?: string;
    classes?: any;
    slots?: Index<ILayoutComponent[]>;
    __layoutId?: string;
    handle?: string;
}

export type KofiProps = IKofiInputProps & IKofiProps;
