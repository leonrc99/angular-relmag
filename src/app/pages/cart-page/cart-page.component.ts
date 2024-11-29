import { Component } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  cartItems: any[] = [];
  isLoading = true;
  totalPrice = 0;
  userId!: number;

  constructor(
    private cartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      this.userId = userId;
      this.loadCart(userId);
    });
  }

  loadCart(userId: number): void {
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

  updateQuantity(): void {
    console.log('updated!')
  }

  removeItem(itemId: string, userId: number): void {
    this.cartService.deleteCartItem(itemId).subscribe({
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
}
