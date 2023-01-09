import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ProductItemComponent } from './list-product/product-item/product-item.component';
import { PanierComponent } from './panier/panier.component';
import { ProductService } from './services/product.service';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { AuthComponent } from './auth/auth.component';
import { FooterComponent } from './footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { InscriptionComponent } from './inscription/inscription.component';

const appRoutes: Routes = [
  {path:'', component: AuthComponent},
  {path: 'produits', component: ListProductComponent},
  {path: 'produits/:cat', component: ListProductComponent},
  {path: 'detail/:id', component: DetailProduitComponent},
  {path: 'login', component: AuthComponent},
  {path: 'signup', component: InscriptionComponent},
  {path:'panier', component: PanierComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    ListProductComponent,
    ProductItemComponent,
    PanierComponent,
    NavbarComponent,
    DetailProduitComponent,
    AuthComponent,
    FooterComponent,
    SideBarComponent,
    InscriptionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
