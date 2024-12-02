import { Component, OnInit } from '@angular/core';
import { TarotService } from '../../services/tarot.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-tarot-list',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './tarot-list.component.html',
  styleUrl: './tarot-list.component.scss'
})
export class TarotListComponent  implements OnInit {
  consultants: any[] = [];
  isLoading = true;

  constructor(private tarotService: TarotService) {}

  ngOnInit(): void {
    this.loadConsultants();
  }

  loadConsultants(): void {
    this.isLoading = true;
    this.tarotService.getTarotConsultants().subscribe({
      next: (data) => {
        this.consultants = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar tarólogos:', err);
        this.isLoading = false;
      },
    });
  }
}
