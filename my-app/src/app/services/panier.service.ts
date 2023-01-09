import { Injectable } from '@angular/core';
import { DetailPanier } from '../models/detailPanier';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  products : DetailPanier[] = [];

  constructor() { }

  add(product: Product, qte: number) {
    this.products.push(new DetailPanier(product, qte));
  }

  remove(id: number) {
    this.products = [];
  }

  getAll() {
    return this.products;
  }
}
