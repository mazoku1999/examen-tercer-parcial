import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gato } from '../models/gato.model';

@Injectable({
  providedIn: 'root'
})
export class GatosService {
  private apiUrl = 'https://api.thecatapi.com/v1/images/search';

  constructor(private http: HttpClient) {}

  obtenerGatosAleatorios(): Observable<Gato[]> {
    const params = {
      limit: '12'
    };

    return this.http.get<any[]>(this.apiUrl, { params }).pipe(
      map(gatos => gatos.map(gato => ({
        id: gato.id,
        url: gato.url,
        ancho: gato.width,
        alto: gato.height
      })))
    );
  }
}
