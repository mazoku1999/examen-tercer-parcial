import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GhibliService } from '../services/ghibli.service';
import { PeliculaGhibli } from '../models/pelicula-ghibli.model';

@Component({
  selector: 'app-ghibli',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ghibli.component.html',
  styleUrl: './ghibli.component.css'
})
export class GhibliComponent implements OnInit {
  peliculas = signal<PeliculaGhibli[]>([]);
  cargando = signal<boolean>(true);

  constructor(private ghibliService: GhibliService) {}

  ngOnInit(): void {
    this.cargarPeliculas();
  }

  cargarPeliculas(): void {
    this.cargando.set(true);
    this.ghibliService.obtenerPeliculas().subscribe({
      next: (datos) => {
        this.peliculas.set(datos);
        this.cargando.set(false);
      },
      error: (error) => {
        console.error('Error al cargar películas de Ghibli:', error);
        this.cargando.set(false);
      }
    });
  }

  truncarTexto(texto: string, maxLength: number = 120): string {
    return texto.length > maxLength ? texto.substring(0, maxLength) + '...' : texto;
  }
}
