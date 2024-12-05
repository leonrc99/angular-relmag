import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { ProductService } from '../../services/product.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, CurrencyPipe, ProductCardComponent, RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit {
  @ViewChild('carousel') carousel!: ElementRef;

  cartItems: any[] = [];
  isLoading = true;
  totalPrice = 0;
  userId: any;
  
  products: any[] = [];

  constructor(
    private cartService: ShoppingCartService,
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCartByLoggedUser();

    this.productService.getFeaturedProducts().subscribe((products) => {
      this.products = products;
    });
  }

  getCartByLoggedUser() {
    if(!localStorage.getItem('authToken')) {
      this.router.navigate(['/login'])
    }

    this.authService.getLoggedUser().subscribe({
      next: (user: any) => {
        this.userId = user.id;
        console.log('userId: ', this.userId);
        this.loadCart(this.userId); // Mover para cá
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  public addItemToCart(userId: string, productId: string, quantity: number) {
    this.cartService.addItemToCart(userId, productId, quantity).subscribe({
      next: () => this.getCartByLoggedUser(),
      error: (err) => console.error('Erro ao adicionar item:', err),
    });
  }

  loadCart(userId: any): void {
    this.isLoading = true;
    this.cartService.getShoppingCart(userId).subscribe({
      next: (items: any) => {
        this.cartItems = items.items;
        this.calculateTotalPrice();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar o carrinho:', err);
        this.isLoading = false;
      },
    });
  }

  updateQuantity(userId: string, productId: string, quantity: number): void {
    this.cartService.addItemToCart(userId, productId, quantity).subscribe({
      next: () => this.loadCart(userId),
      error: (err) => console.error('Erro ao adicionar item:', err),
    });
  }

  removeItem(itemId: string, userId: string): void {
    this.cartService.deleteCartItem(itemId, userId).subscribe({
      next: () => this.loadCart(userId),
      error: (err) => console.error('Erro ao remover item:', err),
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  checkout(): void {
    this.cartService.checkout().subscribe({
      next: () => alert('Compra finalizada com sucesso!'),
      error: (err) => console.error('Erro ao finalizar a compra:', err),
    });
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
