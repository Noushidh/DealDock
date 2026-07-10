
export type Product = {
    _id:string;
    title:string;
    price:number;
    description:string;
    images:string[];
    quantity:number;
    isSold?:boolean;
}