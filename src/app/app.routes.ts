import {  Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { TarotListComponent } from './pages/tarot-list/tarot-list.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ConsultantPageComponent } from './pages/consultant-page/consultant-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:id', component: CategoryPageComponent },
  { path: 'tarot', component: TarotListComponent },
  { path: 'product/:id', component: ProductPageComponent },
  { path: 'consultant/:id', component: ConsultantPageComponent },
  { path: 'shopping-cart', component: CartPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: '**', redirectTo: '' }
];