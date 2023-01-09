import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  products : Product[] = [];

  panier : Product[] = [];

  constructor(private productService : ProductService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['cat']){
      let products = this.productService.filter(this.route.snapshot.params['cat']);
      if(products != null)
        this.products = products;
      else
      this.products = this.productService.getAll();
    }
    else
      this.products = this.productService.getAll();
  }

  productSelected($event: Product) {
    alert($event.price);
    this.panier.push($event);
  }

}
