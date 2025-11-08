import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriptosService } from '../services/criptos.service';
import { Cripto } from '../models/cripto.model';

@Component({
  selector: 'app-criptos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './criptos.component.html',
  styleUrl: './criptos.component.css'
})
export class CriptosComponent implements OnInit {
  criptos: Cripto[] = [];
  cargando: boolean = false;

  constructor(private criptosService: CriptosService) {}

  ngOnInit(): void {
    this.cargarCriptos();
  }

  cargarCriptos(): void {
    this.cargando = true;
    this.criptosService.obtenerCriptos().subscribe({
      next: (datos) => {
        this.criptos = datos;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar criptomonedas:', error);
        this.cargando = false;
      }
    });
  }

  formatearPrecio(precio: number): string {
    return '$' + precio.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  formatearNumero(num: number): string {
    if (num >= 1_000_000_000) {
      return '$' + (num / 1_000_000_000).toFixed(2) + 'B';
    }
    if (num >= 1_000_000) {
      return '$' + (num / 1_000_000).toFixed(2) + 'M';
    }
    return '$' + num.toLocaleString('en-US');
  }
}
