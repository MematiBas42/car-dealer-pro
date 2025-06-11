import { Prisma } from "@prisma/client";
import { ChangeEvent } from "react";

type Params = {
    [x: string]: string | string[];
}
export type PageProps = {
    params?: Promise<Params>;
    searchParams?: Promise<{[x: string]:string | string[]|undefined}>;
}

export type AwaitedPageProps =  {
    params?: Awaited<PageProps['params']>;
    searchParams?: Awaited<PageProps['searchParams']>;
}

export type CarWithImages = Prisma.ClassifiedGetPayload<{
    include: {
        images: true;
    }
}>

export enum MultiStepFormEnum {
    WELCOME = 1,
    SELECT_DATE = 2,
    SUBMIT_DETAILS = 3,
}

export interface Favourites {
    ids: number[]
}

export interface TaxonomyFiltersProps extends AwaitedPageProps {
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export type FilterOptions<Ltype, VType> = Array<{ label: Ltype; value: VType }>;

export interface MultiStepsFormComponentProps extends AwaitedPageProps {
    car: Prisma.ClassifiedGetPayload<{
        include: {
            make: true
        }
    }>
}