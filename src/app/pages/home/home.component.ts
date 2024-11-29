import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  featuredProducts: any[] = [];
  categories: any[] = [];
  userLogged: boolean = false;
  userInfo: any;
  userName: any;

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe((products) => {
      this.featuredProducts = products;
    });

    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.loggedUser();
  }

  loggedUser() {
    this.userInfo = this.authService.decodeToken();

    if (this.userInfo !== null) {
      this.userName = this.userInfo.name;
      return (this.userLogged = true);
    } else {
      return (this.userLogged = false);
    }
  }
}
