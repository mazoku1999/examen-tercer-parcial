import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Clima } from '../models/clima.model';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private urlBase = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) { }

  obtenerClimaActual(latitud: number, longitud: number): Observable<Clima> {
    const parametros = `?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

    return this.http.get<any>(`${this.urlBase}${parametros}`).pipe(
      map(respuesta => ({
        latitud: respuesta.latitude,
        longitud: respuesta.longitude,
        zona_horaria: respuesta.timezone,
        temperatura_actual: respuesta.current.temperature_2m,
        humedad: respuesta.current.relative_humidity_2m,
        velocidad_viento: respuesta.current.wind_speed_10m,
        descripcion_clima: this.obtenerDescripcionClima(respuesta.current.weather_code),
        codigo_clima: respuesta.current.weather_code
      }))
    );
  }

  obtenerPronostico(latitud: number, longitud: number): Observable<any> {
    const parametros = `?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&forecast_days=1`;

    return this.http.get<any>(`${this.urlBase}${parametros}`);
  }

  private obtenerDescripcionClima(codigo: number): string {
    const descripciones: { [key: number]: string } = {
      0: 'Cielo despejado',
      1: 'Principalmente despejado',
      2: 'Parcialmente nublado',
      3: 'Nublado',
      45: 'Neblina',
      48: 'Neblina con escarcha',
      51: 'Llovizna ligera',
      53: 'Llovizna moderada',
      55: 'Llovizna densa',
      61: 'Lluvia ligera',
      63: 'Lluvia moderada',
      65: 'Lluvia intensa',
      71: 'Nieve ligera',
      73: 'Nieve moderada',
      75: 'Nieve intensa',
      95: 'Tormenta'
    };
    return descripciones[codigo] || 'Desconocido';
  }
}
