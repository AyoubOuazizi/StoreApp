import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common'
import { Product } from 'src/app/models/product';
import { PanierService } from '../services/panier.service';
import { ProductService } from '../services/product.service';
import { map, Subscription, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DetailPanier } from '../models/detailPanier';
import { BookmarksService } from '../services/bookmarks.service';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit, OnDestroy {
  product!: Product;
  qte : number = 1;
  loading: boolean = false;
  currentImg: string = "";
  oldPrice: number = 0;
  pourcentage: string = "";
  relatedProducts: Product[] = [];
  private productsObsSubscription! : Subscription;
  userId!: string;
  saved: boolean = false;
  
  constructor(private productService : ProductService,
              private route : ActivatedRoute,
              private panierService : PanierService,
              private router: Router,
              private location: Location,
              private authService: AuthService, 
              private bookmarksService: BookmarksService) { }

  ngOnInit(): void {
    let id : number;
    this.route.params.subscribe(
      (params: Params) => {
        id = params['id'];
        this.loading = true;
        this.productService.get(+id).subscribe(
          (res: any) => {
            this.product = res;
            this.currentImg = this.product.thumbnail;
            this.oldPrice = Math.round(this.product.price*(1+this.product.discountPercentage/100));
            this.pourcentage = (this.product.rating/5)*100+'%';
            this.productService.filter(this.product.category);
            this.productService.getAll();
            this.saved = this.isSaved();
            this.loading = false;
          }, error => {
            this.router.navigate(['not-found']);
          }
        );
      }
    );
    this.productsObsSubscription = this.productService.productsEmitter.subscribe(products => {
      this.relatedProducts = [];
      let i=1;
      products.forEach(prod => {
        if(prod.id != this.product.id && i<5) {
          i++;
          this.relatedProducts.push(prod);
        }
      });
    });
  }

  isSaved() {
    let isSaved: boolean = false;
    this.bookmarksService.products.forEach(item => {
      if(item.product.id == this.product.id)
        isSaved = true;
        return;
    });
    return isSaved;
  }

  addToBookmarks() {
    if(this.saved) {
      this.bookmarksService.removeFromBookmarks(this.product);
    } else {
      this.bookmarksService.addToBookmarks(this.product);
    }
    this.saved = !this.saved;
  }

  addToCart(event: MouseEvent) {
    event.stopPropagation();
    this.authService.user.pipe(take(1), map(user => {
      this.userId = user.id;
      this.panierService.saveOnPanier({...new DetailPanier(this.product, this.qte), userId: this.userId});
    })).subscribe();
  }

  back() {
    this.location.back();
  }

  check() {
    if (this.qte > this.product.stock)
      this.qte = this.product.stock;
    else if (this.qte <= 0)
      this.qte = 1;
  }

  change(img: string) {
    this.currentImg = img;
  }

  ngOnDestroy(): void {
    this.productsObsSubscription.unsubscribe();
  }
}
