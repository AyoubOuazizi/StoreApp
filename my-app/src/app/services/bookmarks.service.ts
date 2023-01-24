import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject, take } from 'rxjs';
import { Product } from '../models/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {
  products : {product: Product, id: string}[] = [];
  productsEmitter = new Subject<{product: Product, id: string}[]>();
  isFetching: boolean = false;
  userId!: string;

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.fetchBookmarks();
  }

  fetchBookmarks() {
    this.isFetching = true;
    this.http.get<{product: Product, userId: string}[]>('https://emistore-bcd78-default-rtdb.firebaseio.com/bookmarks.json').pipe(map(responseData => {
      const productsArray: {product: Product, id: string}[] = [];
      for (const key in responseData) {
        this.authService.user.pipe(take(1), map(user => {
          if(user.id == responseData[key].userId) {
            let {product} = responseData[key];
            if (responseData.hasOwnProperty(key))
              productsArray.push({product: product, id: key});
          }
        })).subscribe();
      }
      return productsArray;
    })).subscribe(
      products => {
        if (products)
          this.products = products;
        this.productsEmitter.next(this.products);
        this.isFetching = false;
      },
      error => {
        this.isFetching = false;
      }
    );
  }
  
  getAll() {
    this.productsEmitter.next(this.products);
  }

  addToBookmarks(product: Product) {
    this.authService.user.pipe(take(1), map(user => {
      this.userId = user.id;
      this.http.post('https://emistore-bcd78-default-rtdb.firebaseio.com/bookmarks.json', {product: product, userId: this.userId}).subscribe(responseData => {
        this.fetchBookmarks();
      });
    })).subscribe();
  }

  removeFromBookmarks(product: Product) {
    let id: string = "";
    this.products.forEach(item => {
      if (item.product.id == product.id) {
        id = item.id;
        return;
      }
    });
    this.http.delete(`https://emistore-bcd78-default-rtdb.firebaseio.com/bookmarks/${id}.json`).subscribe(responseData => {
      this.fetchBookmarks();
    });
  }
}
