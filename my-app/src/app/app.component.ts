import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'My store';

  constructor(private router:Router, private authService: AuthService){}

  ngOnInit(): void {
    this.authService.autoLogin();
  }

  isLogin() {
    if(this.router.url=="/login" || this.router.url=="/not-found" || this.router.url=="/signup")
      return true;
    return false;
  }

  showCat() {
    if(this.router.url.includes("produits"))
      return true;
    return false;
  }

  isDetails() {
    if(this.router.url.includes('detail'))
      return true;
    return false;
  }

  isPanier() {
    if(this.router.url.includes('panier'))
      return true;
    return false;
  }
}
