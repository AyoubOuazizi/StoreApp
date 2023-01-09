import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  @Output() productSelected = new EventEmitter<Product>();
  qte: number = 1;

  constructor(private router:Router, private panierService:PanierService) { }

  ngOnInit(): void {
    if (!this.product.dispo)
      this.qte = 0;
  }

  onProductClick(event: MouseEvent) {
    event.stopPropagation();
    //this.productSelected.emit(this.product);
    this.panierService.add(this.product,this.qte);
  }

  showDetails() {
    this.router.navigate(['detail',this.product.id]);
  }

}
