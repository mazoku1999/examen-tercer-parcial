import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pais } from '../models/pais.model';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  private urlBase = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  obtenerPaisesPorRegion(region: string): Observable<Pais[]> {
    return this.http.get<any[]>(`${this.urlBase}/region/${region}`).pipe(
      map(paises => paises.map(pais => this.mapearPais(pais)))
    );
  }

  obtenerTodosPaises(): Observable<Pais[]> {
    return this.http.get<any[]>(`${this.urlBase}/all`).pipe(
      map(paises => paises.slice(0, 20).map(pais => this.mapearPais(pais)))
    );
  }

  obtenerPaisPorCodigo(codigo: string): Observable<Pais> {
    return this.http.get<any[]>(`${this.urlBase}/alpha/${codigo}`).pipe(
      map(paises => this.mapearPais(paises[0]))
    );
  }

  private mapearPais(pais: any): Pais {
    return {
      nombre: {
        comun: pais.name.common,
        oficial: pais.name.official
      },
      capital: pais.capital || ['N/A'],
      region: pais.region,
      subregion: pais.subregion || 'N/A',
      poblacion: pais.population,
      area: pais.area,
      bandera: pais.flags.png,
      codigo: pais.cca3,
      monedas: pais.currencies,
      idiomas: pais.languages
    };
  }
}
