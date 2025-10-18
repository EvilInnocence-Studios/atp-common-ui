import { IContent } from "@common-shared/content/types";

export declare interface IPageProps {
    page: IContent | null;
    notFoundPage: Partial<IContent>;
    isLoading: boolean;
    notFound: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IPageInputProps {
    slug: string;
}

export type PageProps = IPageInputProps & IPageProps;