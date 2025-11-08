import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Personaje } from '../models/personaje.model';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  obtenerPersonajes(): Observable<Personaje[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.results.slice(0, 12).map((personaje: any) => ({
        id: personaje.id,
        nombre: personaje.name,
        estado: personaje.status,
        especie: personaje.species,
        tipo: personaje.type || 'N/A',
        genero: personaje.gender,
        origen: {
          nombre: personaje.origin.name
        },
        ubicacion: {
          nombre: personaje.location.name
        },
        imagen: personaje.image,
        episodios: personaje.episode
      })))
    );
  }
}
