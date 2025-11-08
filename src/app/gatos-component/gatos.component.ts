import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GatosService } from '../services/gatos.service';
import { Gato } from '../models/gato.model';

@Component({
  selector: 'app-gatos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gatos.component.html',
  styleUrl: './gatos.component.css'
})
export class GatosComponent implements OnInit {
  gatos = signal<Gato[]>([]);
  cargando = signal<boolean>(true);

  constructor(private gatosService: GatosService) { }

  ngOnInit(): void {
    this.cargarGatos();
  }

  cargarGatos(): void {
    this.cargando.set(true);
    this.gatosService.obtenerGatosAleatorios().subscribe({
      next: (datos) => {
        this.gatos.set(datos);
        this.cargando.set(false);
      },
      error: (error) => {
        console.error('Error al cargar gatos:', error);
        this.cargando.set(false);
      }
    });
  }
}
