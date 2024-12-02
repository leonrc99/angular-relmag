import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TarotService } from '../../services/tarot.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-consultant-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent],
  templateUrl: './consultant-page.component.html',
  styleUrl: './consultant-page.component.scss'
})
export class ConsultantPageComponent implements OnInit {
  consultant: any = null;
  isLoading = true;
  appointmentForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private tarotService: TarotService,
    private fb: FormBuilder
  ) {
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const consultantId = params['id'];
      this.loadConsultantDetails(consultantId);
    });
  }

  loadConsultantDetails(consultantId: string): void {
    this.isLoading = true;
    this.tarotService.getConsultantById(consultantId).subscribe({
      next: (data) => {
        this.consultant = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar tarólogo:', err);
        this.isLoading = false;
      },
    });
  }

  scheduleAppointment(): void {
    if (this.appointmentForm.valid) {
      const appointmentData = {
        consultantId: this.consultant.id,
        ...this.appointmentForm.value,
      };
      this.tarotService.createAppointment(appointmentData).subscribe({
        next: () => alert('Consulta agendada com sucesso!'),
        error: (err) => console.error('Erro ao agendar consulta:', err),
      });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
}
