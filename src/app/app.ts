import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisesComponent } from './paises-component/paises.component';
import { ClimaComponent } from './clima-component/clima.component';
import { UsuariosComponent } from './usuarios-component/usuarios.component';
import { PokemonComponent } from './pokemon-component/pokemon.component';
import { PersonajesComponent } from './personajes-component/personajes.component';
import { CriptosComponent } from './criptos-component/criptos.component';
import { GatosComponent } from './gatos-component/gatos.component';
import { GhibliComponent } from './ghibli-component/ghibli.component';
import { LucideAngularModule, Globe, Cloud, Users, Gamepad2, Tv, Bitcoin, Cat, Film } from 'lucide-angular';

interface Tab {
  id: string;
  nombre: string;
}

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    PaisesComponent,
    ClimaComponent,
    UsuariosComponent,
    PokemonComponent,
    PersonajesComponent,
    CriptosComponent,
    GatosComponent,
    GhibliComponent,
    LucideAngularModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('examen-tercer-parcial');
  readonly Globe = Globe;
  readonly Cloud = Cloud;
  readonly Users = Users;
  readonly Gamepad2 = Gamepad2;
  readonly Tv = Tv;
  readonly Bitcoin = Bitcoin;
  readonly Cat = Cat;
  readonly Film = Film;

  tabs: Tab[] = [
    { id: 'paises', nombre: 'Países' },
    { id: 'clima', nombre: 'Clima' },
    { id: 'usuarios', nombre: 'Usuarios' },
    { id: 'pokemon', nombre: 'Pokémon' },
    { id: 'personajes', nombre: 'Rick & Morty' },
    { id: 'criptos', nombre: 'Crypto' },
    { id: 'gatos', nombre: 'Cats' },
    { id: 'ghibli', nombre: 'Ghibli Films' }
  ];

  tabActiva = signal<string>('paises');

  cambiarTab(tabId: string): void {
    this.tabActiva.set(tabId);
  }

  esTabActiva(tabId: string): boolean {
    return this.tabActiva() === tabId;
  }
}
