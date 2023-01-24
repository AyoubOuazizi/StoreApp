import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { BookmarksService } from '../services/bookmarks.service';
import { PanierService } from '../services/panier.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  categories : string[] = [];
  private catObsSubscription! : Subscription;
  panier: number = 0;
  bookmarks: number = 0;
  model : {search: string} = {search : ""};
  private userSub! : Subscription;
  private productsObsSubscription! : Subscription;
  private bookmarksObsSubscription! : Subscription;

  constructor(private productService: ProductService, private http: HttpClient, private panierService: PanierService, private router: Router, private authService: AuthService, private route: ActivatedRoute, private bookmarksService: BookmarksService) {
    router.events.subscribe((val) => {
      if(val instanceof NavigationStart && !val.url.match("search")) {
        this.model.search = "";
      }
    });
  }

  ngOnInit(): void {
    this.catObsSubscription = this.productService.getCategories().subscribe(
      (results: any) => {
        this.categories = results;
      }
    );

    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; 
    });

    this.productsObsSubscription = this.panierService.panierEmitter.subscribe(products => {
      this.panier = products.length;
    });
    this.panierService.fetchPanier();

    this.bookmarksObsSubscription = this.bookmarksService.productsEmitter.subscribe(products => {
      this.bookmarks = products.length;
    });
    this.bookmarksService.fetchBookmarks();
  }

  filter(cat: string){
    this.productService.filter(cat);
  }

  isEmpty() {
    if(this.panier)
      return false;
    return true;
  }

  bookmarksIsEmpty() {
    if(this.bookmarks)
      return false;
    return true;
  }

  showSideBar() {
    if(this.router.url.includes("produits")) {
      return true;
    }
    return false;
  }

  search(event: any) {
    this.productService.search(event.target.value);
  }

  clearSearch(){
    this.model.search = "";
    this.productService.fetchAllProducts();
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.catObsSubscription.unsubscribe();
    this.userSub.unsubscribe();
    this.productsObsSubscription.unsubscribe();
    this.bookmarksObsSubscription.unsubscribe();
  }
}
