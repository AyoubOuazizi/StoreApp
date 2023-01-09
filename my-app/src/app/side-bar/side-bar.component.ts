import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  categories : String[] = [];

  constructor(private productService: ProductService, private http: HttpClient) {
    
  }

  ngOnInit(): void {
    this.http.get("https://dummyjson.com/products/categories").subscribe(
      (results: any) => {
        this.categories = results;
        console.log(results);
      }
    );
    //this.categories = this.productService.getCategories();
  }
}
