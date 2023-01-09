export class Product {
    id!:number; 
    libelle!: string; 
    price!: number; 
    imageURL!:string;
    dispo!:boolean;

    constructor(id:number, libelle: string, price: number, imageURL:string, dispo:boolean) {
        this.id = id;
        this.libelle = libelle;
        this.price = price;
        this.imageURL = imageURL;
        this.dispo = dispo;
    }
}