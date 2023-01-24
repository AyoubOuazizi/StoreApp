import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { DetailPanier } from 'src/app/models/detailPanier';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { BookmarksService } from 'src/app/services/bookmarks.service';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  saved: boolean = false;
  @Output() productSelected = new EventEmitter<Product>();
  qte: number = 1;
  oldPrice: number = 0;
  userId!: string;

  constructor(private router:Router, private panierService:PanierService, private authService: AuthService, private bookmarksService: BookmarksService) { }

  ngOnInit(): void {
    this.oldPrice = Math.round(this.product.price*(1+this.product.discountPercentage/100));
    if (!this.product.stock)
      this.qte = 0;
    this.saved = this.isSaved();
  }

  addToCart(event: MouseEvent) {
    event.stopPropagation();
    this.authService.user.pipe(take(1), map(user => {
      this.userId = user.id;
      this.panierService.saveOnPanier({...new DetailPanier(this.product), userId: this.userId});
    })).subscribe();
    //this.productSelected.emit(this.product);
  }

  showDetails() {
    this.router.navigate(['detail',this.product.id]);
  }

  addToBookmarks() {
    if(this.saved) {
      this.bookmarksService.removeFromBookmarks(this.product);
    } else {
      this.bookmarksService.addToBookmarks(this.product);
    }
    this.saved = !this.saved;
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

}

