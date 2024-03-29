import { Offer } from "./offer";

export interface Brand {
    id?:string,
    name: string,
    nameAR?:string,
    logo:File | string,
    // overView:string,
    // categories:string[],
    // products?:string[],
    offers: Offer[]
}