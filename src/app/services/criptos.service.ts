import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Cripto } from '../models/cripto.model';

@Injectable({
  providedIn: 'root'
})
export class CriptosService {
  private apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';

  constructor(private http: HttpClient) {}

  obtenerCriptos(): Observable<Cripto[]> {
    const params = {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: '10',
      page: '1'
    };

    return this.http.get<any[]>(this.apiUrl, { params }).pipe(
      map(criptos => criptos.map(cripto => ({
        id: cripto.id,
        simbolo: cripto.symbol.toUpperCase(),
        nombre: cripto.name,
        imagen: cripto.image,
        precio_actual: cripto.current_price,
        cambio_24h: cripto.price_change_percentage_24h,
        capitalizacion_mercado: cripto.market_cap,
        volumen_24h: cripto.total_volume
      })))
    );
  }
}
