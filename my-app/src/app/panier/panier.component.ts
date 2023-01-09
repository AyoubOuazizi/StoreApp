import { Component, OnInit } from '@angular/core';
import { DetailPanier } from '../models/detailPanier';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  panier : DetailPanier[] = [];

  constructor(private panierService : PanierService) { }

  ngOnInit(): void {
    this.panier = this.panierService.getAll();
  }

}
