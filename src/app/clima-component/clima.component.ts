import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClimaService } from '../services/clima.service';
import { Clima } from '../models/clima.model';

@Component({
  selector: 'app-clima',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clima.component.html',
  styleUrl: './clima.component.css'
})
export class ClimaComponent implements OnInit {
  ciudades: { nombre: string; lat: number; lon: number; clima?: Clima }[] = [
    { nombre: 'La Paz', lat: -16.5, lon: -68.15 },
    { nombre: 'Cochabamba', lat: -17.3895, lon: -66.1568 },
    { nombre: 'Santa Cruz', lat: -17.8, lon: -63.1667 },
    { nombre: 'Oruro', lat: -17.9833, lon: -67.1167 },
    { nombre: 'Potosí', lat: -19.5836, lon: -65.7531 },
    { nombre: 'Chuquisaca', lat: -19.0332, lon: -65.2627 },
    { nombre: 'Tarija', lat: -21.5355, lon: -64.7296 },
    { nombre: 'Beni', lat: -14.8333, lon: -64.9 },
    { nombre: 'Pando', lat: -11.0267, lon: -68.7692 }
  ];
  cargando: boolean = false;

  constructor(
    private climaService: ClimaService
  ) {}

  ngOnInit(): void {
    this.cargarClimas();
  }

  cargarClimas(): void {
    this.cargando = true;
    let completados = 0;

    this.ciudades.forEach((ciudad, index) => {
      this.climaService.obtenerClimaActual(ciudad.lat, ciudad.lon).subscribe({
        next: (clima) => {
          this.ciudades[index].clima = clima;
          completados++;
          if (completados === this.ciudades.length) {
            this.cargando = false;
          }
        },
        error: (error) => {
          console.error(`Error al cargar clima de ${ciudad.nombre}:`, error);
          completados++;
          if (completados === this.ciudades.length) {
            this.cargando = false;
          }
        }
      });
    });
  }

  obtenerIconoClima(codigo: number): string {
    if (codigo === 0) return '☀️';
    if (codigo <= 3) return '⛅';
    if (codigo >= 45 && codigo <= 48) return '🌫️';
    if (codigo >= 51 && codigo <= 67) return '🌧️';
    if (codigo >= 71 && codigo <= 77) return '🌨️';
    if (codigo >= 95) return '⛈️';
    return '🌤️';
  }
}
