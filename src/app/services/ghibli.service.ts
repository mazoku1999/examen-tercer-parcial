import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeliculaGhibli } from '../models/pelicula-ghibli.model';

@Injectable({
  providedIn: 'root'
})
export class GhibliService {
  private apiUrl = 'https://ghibliapi.vercel.app/films';

  constructor(private http: HttpClient) {}

  obtenerPeliculas(): Observable<PeliculaGhibli[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(peliculas => peliculas.slice(0, 10).map(pelicula => ({
        id: pelicula.id,
        titulo: pelicula.title,
        tituloOriginal: pelicula.original_title,
        imagen: pelicula.image,
        descripcion: pelicula.description,
        director: pelicula.director,
        productor: pelicula.producer,
        anioLanzamiento: pelicula.release_date,
        tiempoEjecucion: pelicula.running_time,
        puntuacionRT: pelicula.rt_score
      })))
    );
  }
}
