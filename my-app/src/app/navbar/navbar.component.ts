import { Component, OnInit } from '@angular/core';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  panier: number = 0;

  constructor(private panierService: PanierService) { }

  ngOnInit(): void {
  }

  isEmpty() {
    this.panier = this.panierService.getAll().length;
    if(this.panier)
      return false;
    return true;
  }

}
