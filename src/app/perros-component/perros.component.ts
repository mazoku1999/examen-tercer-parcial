import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerrosService } from '../services/perros.service';
import { Perro } from '../models/perro.model';

@Component({
  selector: 'app-perros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perros.component.html',
  styleUrl: './perros.component.css'
})
export class PerrosComponent implements OnInit {
  perros = signal<Perro[]>([]);
  cargando = signal<boolean>(true);

  constructor(private perrosService: PerrosService) {}

  ngOnInit(): void {
    this.cargarPerros();
  }

  cargarPerros(): void {
    this.cargando.set(true);
    this.perrosService.obtenerRazas().subscribe({
      next: (datos) => {
        this.perros.set(datos);
        this.cargando.set(false);
      },
      error: (error) => {
        console.error('Error al cargar perros:', error);
        this.cargando.set(false);
      }
    });
  }

  formatearRaza(raza: string): string {
    return raza.charAt(0).toUpperCase() + raza.slice(1);
  }
}
