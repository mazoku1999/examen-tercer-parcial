import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Perro } from '../models/perro.model';

@Injectable({
  providedIn: 'root'
})
export class PerrosService {
  private apiUrl = 'https://dog.ceo/api';

  constructor(private http: HttpClient) {}

  obtenerRazas(): Observable<Perro[]> {
    return this.http.get<any>(`${this.apiUrl}/breeds/list/all`).pipe(
      map(response => {
        const razas = Object.keys(response.message);
        return razas.slice(0, 20);
      }),
      switchMap(razas => {
        const requests = razas.map(raza =>
          this.http.get<any>(`${this.apiUrl}/breed/${raza}/images/random`).pipe(
            map(imgResponse => ({
              raza: raza,
              imagen: imgResponse.message
            }))
          )
        );
        return forkJoin(requests);
      })
    );
  }
}
