export declare interface IPatreonProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IPatreonInputProps {
    className?: string;
    css?: string;
    classes?: any;
    slots?: Index<ILayoutComponent[]>;
    __layoutId?: string;
    handle?: string;
}

export type PatreonProps = IPatreonInputProps & IPatreonProps;
