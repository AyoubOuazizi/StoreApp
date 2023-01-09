import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { PanierService } from '../services/panier.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {
  product!: Product;
  qte : number = 1;
  
  constructor(private productService : ProductService,
              private route : ActivatedRoute,
              private panierService : PanierService) { }

  ngOnInit(): void {
    const id : number = this.route.snapshot.params['id'];
    let product = this.productService.get(+id);
    if (product)
      this.product = product;
  }

  addProduct() {
    this.panierService.add(this.product, this.qte);
    alert("Successfully added");
  }

}
