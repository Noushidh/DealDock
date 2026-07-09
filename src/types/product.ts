
export type Product = {
    _id:string;
    title:string;
    price:string;
    description:string;
    images:string[];
    isSold?:boolean;
}