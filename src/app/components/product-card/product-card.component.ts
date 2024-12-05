import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() productName: any;
  @Input() productDescription: any;
  @Input() productPrice: any;
  @Input() productId: any;

  userId: any;

  constructor(
    private cartService: ShoppingCartService,
    private authService: AuthService,
    private router: Router
  ) {}

  getLoggedUser() {
    if (!localStorage.getItem('authToken')) {
      this.router.navigate(['/login']);
    }

    this.authService.getLoggedUser().subscribe({
      next: (user: any) => {
        this.userId = user.id;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  public goToCartPage() {
    this.router.navigate(['/shopping-cart']);
  }

  public addItemToCart(userId: string, productId: string, quantity: number) {
    this.getLoggedUser();
    
    this.cartService.addItemToCart(userId, productId, quantity).subscribe({
      next: () => this.goToCartPage(),
      error: (err) => console.error('Erro ao adicionar item:', err),
    });
  }
}
