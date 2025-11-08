import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pokemon, ListaPokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private urlBase = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  obtenerListaPokemon(limite: number = 20, desplazamiento: number = 0): Observable<ListaPokemon> {
    return this.http.get<any>(`${this.urlBase}/pokemon?limit=${limite}&offset=${desplazamiento}`).pipe(
      map(respuesta => ({
        cantidad: respuesta.count,
        siguiente: respuesta.next,
        anterior: respuesta.previous,
        resultados: respuesta.results
      }))
    );
  }

  obtenerPokemonPorNombre(nombre: string): Observable<Pokemon> {
    return this.http.get<any>(`${this.urlBase}/pokemon/${nombre}`).pipe(
      map(poke => this.mapearPokemon(poke))
    );
  }

  obtenerPokemonPorId(id: number): Observable<Pokemon> {
    return this.http.get<any>(`${this.urlBase}/pokemon/${id}`).pipe(
      map(poke => this.mapearPokemon(poke))
    );
  }

  private mapearPokemon(poke: any): Pokemon {
    return {
      id: poke.id,
      nombre: poke.name,
      altura: poke.height,
      peso: poke.weight,
      imagen: poke.sprites.other['official-artwork'].front_default || poke.sprites.front_default,
      tipos: poke.types.map((t: any) => ({
        ranura: t.slot,
        tipo: {
          nombre: t.type.name,
          url: t.type.url
        }
      })),
      habilidades: poke.abilities.map((a: any) => ({
        habilidad: {
          nombre: a.ability.name,
          url: a.ability.url
        },
        oculta: a.is_hidden
      })),
      estadisticas: poke.stats.map((s: any) => ({
        valor_base: s.base_stat,
        esfuerzo: s.effort,
        estadistica: {
          nombre: s.stat.name,
          url: s.stat.url
        }
      }))
    };
  }
}
