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
  ) {
    // Inscrevendo-se no Observable do estado do usuário
    this.authService.getLoggedUser().subscribe({
      next: (user) => {
        this.userId = user?.id || null; // Atualiza o userId quando o usuário está disponível
      },
      error: (err) => console.error('Erro ao obter o usuário:', err),
    });
  }

  public goToCartPage() {
    this.router.navigate(['/shopping-cart']);
  }

  public addItemToCart(productId: string, quantity: number) {
    if (!this.userId) {
      this.router.navigate(['/login']); // Redirecionar se o usuário não estiver logado
      return;
    }

    this.cartService.addItemToCart(this.userId, productId, quantity).subscribe({
      next: () => this.router.navigate(['/shopping-cart']),
      error: (err) => console.error('Erro ao adicionar item:', err),
    });
  }
}
