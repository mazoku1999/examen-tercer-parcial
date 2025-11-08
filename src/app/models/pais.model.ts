export interface Pais {
  nombre: {
    comun: string;
    oficial: string;
  };
  capital: string[];
  region: string;
  subregion: string;
  poblacion: number;
  area: number;
  bandera: string;
  codigo: string;
  monedas?: { [key: string]: { nombre: string; simbolo: string } };
  idiomas?: { [key: string]: string };
}
