import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CategoryCardComponent } from "../../components/category-card/category-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, ProductCardComponent, CategoryCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  @ViewChild('carousel') carousel!: ElementRef;

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

  cardWidth = 0;

  ngAfterViewInit() {
    // Calcular a largura do card dinamicamente
    const cardElement =
      this.carousel.nativeElement.querySelector('app-product-card');
    if (cardElement) {
      this.cardWidth = cardElement.offsetWidth + 16; // Largura + espaçamento (gap)
    }
  }

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({
      left: -this.cardWidth * 4, // Pular 4 cards
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({
      left: this.cardWidth * 4, // Pular 4 cards
      behavior: 'smooth',
    });
  }
}
