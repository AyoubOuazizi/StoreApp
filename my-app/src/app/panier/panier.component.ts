import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map, Subscription, take } from 'rxjs';
import { DetailPanier } from '../models/detailPanier';
import { AuthService } from '../services/auth.service';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit, OnDestroy {
  panier : DetailPanier[] = [];
  private productsObsSubscription! : Subscription;
  userId!: string;
  cardType: number= 0;
  subtotal: number = 0;
  trans: {name: string, number: string, date: string, cvv: string} = {name: "", number: "", date: "", cvv: ""};
  success: boolean = false;

  constructor(private panierService : PanierService, private authService: AuthService) { 
    this.success= false;
  }

  ngOnInit(): void {
    this.productsObsSubscription = this.panierService.panierEmitter.subscribe(products => {
      this.panier = products;
      let somme = 0;
      products.forEach(item => {
        somme+=item.product.price*item.qte;
      });
      this.subtotal = somme;
    });
    this.panierService.fetchPanier();
  }

  isFetching() {
    return this.panierService.isFetching;
  }

  check(elem: DetailPanier, event: any) {
    if (event.target.value > elem.product.stock)
      event.target.value = elem.product.stock;
    else if (event.target.value <= 0)
      event.target.value = 1;
    else if (elem.id){
      let id: string = elem.id;
      this.authService.user.pipe(take(1), map(user => {
        this.userId = user.id;
        this.panierService.updateOnPanier({product: elem.product, qte: event.target.value, id: id, userId: this.userId});
      })).subscribe();
    }
  }

  cvvCheck(event: any) {
    if (event.target.value > 999)
      event.target.value = +(event.target.value.toString().substring(0, 3));
    if (event.data=="-" || event.data=="+")
      event.target.value = +(event.target.value.toString().substring(0, event.target.value.toString().length-1));
  }

  checkout(form: NgForm) {
    this.cardType=0;
    form.reset();
    this.panier.forEach(item => {
      if (item.id)
        this.panierService.deleteOnPanier(item.id);
    });
    this.success= true;
  }

  delete(elem: DetailPanier) {
    if (elem.id)
      this.panierService.deleteOnPanier(elem.id);
  }

  ngOnDestroy(): void {
    this.productsObsSubscription.unsubscribe();
  }
}
