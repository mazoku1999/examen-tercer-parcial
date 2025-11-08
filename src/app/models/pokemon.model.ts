export interface Pokemon {
  id: number;
  nombre: string;
  altura: number;
  peso: number;
  imagen: string;
  tipos: TipoPokemon[];
  habilidades: HabilidadPokemon[];
  estadisticas: EstadisticaPokemon[];
}

export interface TipoPokemon {
  ranura: number;
  tipo: {
    nombre: string;
    url: string;
  };
}

export interface HabilidadPokemon {
  habilidad: {
    nombre: string;
    url: string;
  };
  oculta: boolean;
}

export interface EstadisticaPokemon {
  valor_base: number;
  esfuerzo: number;
  estadistica: {
    nombre: string;
    url: string;
  };
}

export interface ListaPokemon {
  cantidad: number;
  siguiente: string | null;
  anterior: string | null;
  resultados: {
    nombre: string;
    url: string;
  }[];
}
