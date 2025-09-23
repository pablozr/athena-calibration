export interface IProduct {
    name: string;
    description: string;
    price: number;
    in_stock: boolean;
    category: string;
    id?: number;
}

export interface IProductResponse {
    message: string;
    data: IProduct[];
}

export interface IProductSingleResponse {
    message: string;
    data: IProduct;
}