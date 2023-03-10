import { Product } from "./product";

export class DetailPanier {
    product!: Product;
    qte: number = 1;
    id?: string;

    constructor(product: Product, qte?: number) {
        this.product = product;
        if (qte)
            this.qte = qte;
    };
}