export interface Personaje {
  id: number;
  nombre: string;
  estado: string;
  especie: string;
  tipo: string;
  genero: string;
  origen: {
    nombre: string;
  };
  ubicacion: {
    nombre: string;
  };
  imagen: string;
  episodios: string[];
}
