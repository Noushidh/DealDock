
export type Product = {
    _id:string;
    title:string;
    price:number;
    description:string;
    images:string[];
    quantity:number;
    isSold?:boolean;
    owner:string;
}

export type ProductForm = {
  title: string;
  description: string;
  price: number;
  images: FileList; 
};