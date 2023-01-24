import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { Ng2TelInputModule } from 'ng2-tel-input';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthGuardService } from './services/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {path:'', redirectTo: '/produits', pathMatch: 'full'},
  {path: 'produits', component: ListProductComponent, canActivate: [AuthGuardService]},
  {path: 'produits/:cat', component: ListProductComponent, canActivate: [AuthGuardService]},
  {path: 'detail/:id', component: DetailProduitComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: AuthComponent},
  {path: 'signup', component: InscriptionComponent},
  {path:'panier', component: PanierComponent, canActivate: [AuthGuardService]},
  {path:'bookmarks', component: ListProductComponent, canActivate: [AuthGuardService]},
  {path:'not-found', component: PageNotFoundComponent},
  {path:'**', redirectTo: '/not-found'},
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
    InscriptionComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' }),
    HttpClientModule,
    ReactiveFormsModule,
    Ng2TelInputModule
  ],
  providers: [ProductService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
