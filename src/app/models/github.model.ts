export interface UsuarioGitHub {
  id: number;
  nombreUsuario: string;
  nombre: string;
  avatar: string;
  url: string;
  tipo: string;
  bio?: string;
  ubicacion?: string;
  email?: string;
  repositoriosPublicos?: number;
  seguidores?: number;
  siguiendo?: number;
  creadoEn?: string;
}

export interface RepositorioGitHub {
  id: number;
  nombre: string;
  nombreCompleto: string;
  descripcion: string;
  url: string;
  estrellas: number;
  lenguaje: string;
  forks: number;
  abierto: boolean;
}
