import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  categories :String[] = [];
  products : Product[] = [
    // new Product(1, "TV SAMSUNG", 100, "https://images.samsung.com/is/image/samsung/n-africa-fhd-t5300-ua43t5300auxmv-frontblack-237364315?$650_519_PNG$",true),
    // new Product(2, "TV SAMSUNG", 100, "https://images.samsung.com/is/image/samsung/n-africa-fhd-t5300-ua43t5300auxmv-frontblack-237364315?$650_519_PNG$",false),
    // new Product(3, "TV SAMSUNG", 100, "https://images.samsung.com/is/image/samsung/n-africa-fhd-t5300-ua43t5300auxmv-frontblack-237364315?$650_519_PNG$",true),
    // new Product(4, "TV SAMSUNG", 100, "https://images.samsung.com/is/image/samsung/n-africa-fhd-t5300-ua43t5300auxmv-frontblack-237364315?$650_519_PNG$",false),
    // new Product(5, "TV SAMSUNG", 100, "https://images.samsung.com/is/image/samsung/n-africa-fhd-t5300-ua43t5300auxmv-frontblack-237364315?$650_519_PNG$",true),
    // new Product(6, "TV SAMSUNG", 100, "https://images.samsung.com/is/image/samsung/n-africa-fhd-t5300-ua43t5300auxmv-frontblack-237364315?$650_519_PNG$",false),
    // new Product(7, "TV SAMSUNG", 100, "https://images.samsung.com/is/image/samsung/n-africa-fhd-t5300-ua43t5300auxmv-frontblack-237364315?$650_519_PNG$",true),
    // new Product(8, "TV SAMSUNG", 100, "https://images.samsung.com/is/image/samsung/n-africa-fhd-t5300-ua43t5300auxmv-frontblack-237364315?$650_519_PNG$",true),
    // new Product(9, "TV SAMSUNG", 100, "https://images.samsung.com/is/image/samsung/n-africa-fhd-t5300-ua43t5300auxmv-frontblack-237364315?$650_519_PNG$",true)
  ];
  productsEmitter = new Subject<Product[]>();
  noResults: boolean = false;
  
  constructor(private http: HttpClient, private router: Router) {
    this.fetchAllProducts();
  }

  fetchAllProducts() {
    let products : Product[] = [];
    this.http.get("https://dummyjson.com/products?limit=100").subscribe(
      (results: any) => {
        results.products.forEach((element: any) => {
          products.push(element);
        });
        this.products = products;
        this.productsEmitter.next(this.products);
      }
    );
  }

  add(product: Product): void {
    this.add(product);
  }

  get(id: number) {
    return this.http.get(`https://dummyjson.com/products/${id}`);
  }

  getAll() {
    this.productsEmitter.next(this.products);
    this.noResults = false;
  }

  filter(cat : string){
    let products : Product[] = [];
    this.http.get(`https://dummyjson.com/products/category/${cat}`).subscribe(
      (results: any) => {
        if (!results.total) {
          this.router.navigate(['not-found']);
          return;
        }
        results.products.forEach((element: any) => {
          products.push(element);
        });
        if (this.router.url.includes("produits"))
          this.router.navigate(['produits',cat]).then(() => {
            this.products = products;
            this.productsEmitter.next(this.products);
            this.noResults = false;
          });
        else {
          this.products = products;
          this.productsEmitter.next(this.products);
          this.noResults = false;
        }
      }, 
      error => {
        this.router.navigate(['not-found']);
      }
    );
  }

  getCategories() {
    return this.http.get("https://dummyjson.com/products/categories");
  }

  search(motcle: String) {
    let products : Product[] = [];
    this.http.get("https://dummyjson.com/products/search?q="+motcle).subscribe(
      (results: any) => {
        results.products.forEach((element: any) => {
          products.push(element);
        });
        this.router.navigate(['produits'],{queryParams:{search:motcle}}).then(() => {
          this.products = products;
          this.productsEmitter.next(this.products);
          if(products.length == 0) {
            this.noResults = true;
          } else {
            this.noResults = false;
          }
        });
      }
    );
  }
}
