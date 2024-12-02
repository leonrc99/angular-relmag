import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, RouterModule, HeaderComponent],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.scss'
})
export class CategoryPageComponent implements OnInit {
  products: any[] = [];
  categoryId!: string;
  isLoading = true;
  category: any;

  constructor(private route: ActivatedRoute, private apiService: ProductService) {}

  ngOnInit(): void {
    // Obter o ID da categoria da URL
    this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
      this.getCategoryName();
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.apiService.getProductsByCategory(this.categoryId).subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.isLoading = false;
      },
    });
  }

  getCategoryName(): void {
    
    this.apiService.getCategoryById(this.categoryId).subscribe({
      next: (data) => {
        this.category = data.name;
      },
      error: (err) => {
        console.error('Erro ao carregar categoria:', err);
      },
    });
  }
}
