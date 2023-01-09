import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) {
    // this.http.get("https://dummyjson.com/products/categories").subscribe(
    //   (results: any) => {
    //     this.categories = results;
    //     console.log(results);
    //   }
    // );

    http.get("https://dummyjson.com/products").subscribe(
      (results: any) => {
        results.products.forEach((element: any) => {
          this.products.push(new Product(element.id, element.title, element.price, element.images[0], true))
        });
        console.log(results.products);
      }
    );
  }

  add(product: Product): void {
    this.add(product);
  }

  get(id: number): Product|undefined {
    return this.products.find((product: Product) => product.id === id);
  }

  getAll(): Array<Product> {
    return this.products;
  }

  filter(cat : String){
    let products : Product[] = [];
    this.http.get("https://dummyjson.com/products/category/"+cat).subscribe(
      (results: any) => {
        results.products.forEach((element: any) => {
          products.push(new Product(element.id, element.title, element.price, element.images[0], true))
        });
      }
    );
  }

  // getCategories() {
  //   return this.categories;
  // }
}
