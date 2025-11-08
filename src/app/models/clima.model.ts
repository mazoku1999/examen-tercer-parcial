export interface Clima {
  latitud: number;
  longitud: number;
  zona_horaria: string;
  temperatura_actual: number;
  humedad: number;
  velocidad_viento: number;
  descripcion_clima: string;
  codigo_clima: number;
}

export interface PronosticoHorario {
  tiempo: string[];
  temperatura_2m: number[];
  humedad_relativa_2m: number[];
  velocidad_viento_10m: number[];
}

export interface RespuestaClima {
  latitud: number;
  longitud: number;
  zona_horaria: string;
  actual: {
    tiempo: string;
    temperatura_2m: number;
    humedad_relativa_2m: number;
    velocidad_viento_10m: number;
    codigo_clima: number;
  };
  horario?: PronosticoHorario;
}
