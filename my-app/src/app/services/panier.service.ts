import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject, take } from 'rxjs';
import { DetailPanier } from '../models/detailPanier';
import { Product } from '../models/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  products : {product: Product, qte: number, id:string}[] = [];
  panierEmitter = new Subject<DetailPanier[]>();
  isFetching: boolean = false;

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.fetchPanier();
  }

  add(product: Product, qte: number) {
    //this.products.push(new DetailPanier(product, qte));
  }

  remove(id: number) {
    this.products = [];
  }

  getAll() {
    return this.products;
  }

  fetchPanier() {
    this.isFetching = true;
    this.http.get<{product: Product, qte: number, id: string, userId: string}[]>('https://emistore-bcd78-default-rtdb.firebaseio.com/panier.json').pipe(map(responseData => {
      const productsArray: {product: Product, qte: number, id: string}[] = [];
      for (const key in responseData) {
        this.authService.user.pipe(take(1), map(user => {
          if(user.id == responseData[key].userId) {
            let {product, qte} = responseData[key];
            if (responseData.hasOwnProperty(key))
              productsArray.push({...{product, qte}, id: key});
          }
        })).subscribe();
      }
      return productsArray;
    })).subscribe(
      products => {
        if (products)
          this.products = products;
        this.panierEmitter.next(this.products);
        this.isFetching = false;
      },
      error => {
        this.isFetching = false;
      }
    );
  }

  saveOnPanier(product: {product: Product, qte: number, userId: string}) {
    let update = false;
    let id!: string;
    this.products.forEach(item => {
      if(item.product.id == product.product.id){
        update = true;
        id = item.id;
        product.qte += item.qte;
        return;
      }
    });
    if (!update)
      this.http.post('https://emistore-bcd78-default-rtdb.firebaseio.com/panier.json', product).subscribe(responseData => {
        this.fetchPanier();
      });
    else {
      console.log({...product, id: id});
      this.updateOnPanier({...product, id: id});
    }
  }

  updateOnPanier(product: {product: Product, qte: number, id:string, userId: string}) {
    this.http.patch(`https://emistore-bcd78-default-rtdb.firebaseio.com/panier/${product.id}.json`, {product: product.product, qte: product.qte, userId: product.userId}).subscribe(responseData => {
      this.fetchPanier();
    });
  }

  deleteOnPanier(id:string) {
    this.http.delete(`https://emistore-bcd78-default-rtdb.firebaseio.com/panier/${id}.json`).subscribe(responseData => {
      this.fetchPanier();
    });
  }
}
