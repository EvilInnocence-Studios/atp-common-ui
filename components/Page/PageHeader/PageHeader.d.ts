import { IContent } from "@common-shared/content/types";

export declare interface IPageHeaderProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IPageHeaderInputProps {
    page: IContent;
}

export type PageHeaderProps = IPageHeaderInputProps & IPageHeaderProps;