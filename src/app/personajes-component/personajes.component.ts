import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonajesService } from '../services/personajes.service';
import { Personaje } from '../models/personaje.model';

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personajes.component.html',
  styleUrl: './personajes.component.css'
})
export class PersonajesComponent implements OnInit {
  personajes: Personaje[] = [];
  cargando: boolean = false;

  constructor(private personajesService: PersonajesService) {}

  ngOnInit(): void {
    this.cargarPersonajes();
  }

  cargarPersonajes(): void {
    this.cargando = true;
    this.personajesService.obtenerPersonajes().subscribe({
      next: (datos) => {
        this.personajes = datos;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar personajes:', error);
        this.cargando = false;
      }
    });
  }

  obtenerColorEstado(estado: string): string {
    const colores: { [key: string]: string } = {
      'Alive': '#10b981',
      'Dead': '#ef4444',
      'unknown': '#6b7280'
    };
    return colores[estado] || '#6b7280';
  }
}
