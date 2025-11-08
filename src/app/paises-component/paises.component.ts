import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisesService } from '../services/paises.service';
import { Pais } from '../models/pais.model';

@Component({
  selector: 'app-paises',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paises.component.html',
  styleUrl: './paises.component.css'
})
export class PaisesComponent implements OnInit {
  paises: Pais[] = [];
  cargando: boolean = false;

  constructor(
    private paisesService: PaisesService
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.paisesService.obtenerPaisesPorRegion('americas').subscribe({
      next: (datos) => {
        this.paises = datos.filter(pais =>
          pais.subregion === 'South America' ||
          pais.subregion === 'Central America' ||
          pais.nombre.comun === 'México'
        ).slice(0, 15);
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar países:', error);
        this.cargando = false;
      }
    });
  }

  formatearNumero(num: number): string {
    return num.toLocaleString('es-ES');
  }
}
