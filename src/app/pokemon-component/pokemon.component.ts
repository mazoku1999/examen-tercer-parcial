import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent implements OnInit {
  pokemones: Pokemon[] = [];
  cargando: boolean = false;

  constructor(
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.cargarPokemones();
  }

  cargarPokemones(): void {
    this.cargando = true;
    const ids = [1, 4, 7, 25, 133, 151, 143, 150, 248, 384, 448, 717];
    let completados = 0;

    ids.forEach((id) => {
      this.pokemonService.obtenerPokemonPorId(id).subscribe({
        next: (pokemon) => {
          this.pokemones.push(pokemon);
          completados++;
          if (completados === ids.length) {
            this.pokemones.sort((a, b) => a.id - b.id);
            this.cargando = false;
          }
        },
        error: (error) => {
          console.error(`Error al cargar Pokémon ${id}:`, error);
          completados++;
          if (completados === ids.length) {
            this.cargando = false;
          }
        }
      });
    });
  }

  obtenerColorTipo(tipo: string): string {
    const colores: { [key: string]: string } = {
      'normal': '#A8A878', 'fire': '#F08030', 'water': '#6890F0',
      'electric': '#F8D030', 'grass': '#78C850', 'ice': '#98D8D8',
      'fighting': '#C03028', 'poison': '#A040A0', 'ground': '#E0C068',
      'flying': '#A890F0', 'psychic': '#F85888', 'bug': '#A8B820',
      'rock': '#B8A038', 'ghost': '#705898', 'dragon': '#7038F8',
      'dark': '#705848', 'steel': '#B8B8D0', 'fairy': '#EE99AC'
    };
    return colores[tipo] || '#68A090';
  }

  capitalizarPrimeraLetra(texto: string): string {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
}
