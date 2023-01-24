import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';
import { BookmarksService } from '../services/bookmarks.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit, OnDestroy {
  products : Product[] = [];
  bookmarks : {product: Product, id: string}[] = [];
  panier : Product[] = [];
  private productsObsSubscription! : Subscription;
  private bookmarksObsSubscription! : Subscription;

  constructor(private productService : ProductService, private route : ActivatedRoute, private router: Router, private bookmarksService: BookmarksService) {}

  ngOnInit(): void {
    this.productsObsSubscription = this.productService.productsEmitter.subscribe(products => {
      this.products = products;
    });

    this.bookmarksObsSubscription = this.bookmarksService.productsEmitter.subscribe(products => {
      this.bookmarks = products;
      if (this.router.url == "/bookmarks") {
        const products: Product[] = [];
        this.bookmarks.forEach(item => {
          products.push(item.product);
        });
        this.productService.productsEmitter.next(products);
      }
    });

    this.bookmarksService.fetchBookmarks();

    if (!this.route.snapshot.params['cat']){
      if (this.router.url != "/bookmarks") {
        this.productService.fetchAllProducts();
      }
    }
    else {
      this.productService.filter(this.route.snapshot.params['cat']);
    }
    this.productService.getAll();
    this.bookmarksService.getAll();
  }

  isBookmarksPage() {
    if (this.router.url == "/bookmarks") {
      return true;
    }
    return false;
  }

  productSelected($event: Product) {
    alert($event.price);
    this.panier.push($event);
  }

  noResults() {
    if (this.router.url == "/bookmarks") {
      if (this.bookmarks.length == 0)
        return true;
      return false;
    } else
      return this.productService.noResults;
  }

  goToHome() {
    this.productService.fetchAllProducts();
  }

  ngOnDestroy(): void {
    this.productsObsSubscription.unsubscribe();
    this.bookmarksObsSubscription.unsubscribe();
  }
}
