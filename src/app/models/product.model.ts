export interface Product {
    id: number;
    name: string;
    price: number;
    status: number;
}

export interface CreateProductModel {
    name: string;
    price: number;
    status: number;
}