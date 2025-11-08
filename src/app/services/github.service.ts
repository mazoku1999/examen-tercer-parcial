import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UsuarioGitHub, RepositorioGitHub } from '../models/github.model';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private urlBase = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  obtenerUsuarios(cantidad: number = 30): Observable<UsuarioGitHub[]> {
    return this.http.get<any[]>(`${this.urlBase}/users?per_page=${cantidad}`).pipe(
      map(usuarios => usuarios.map(usr => ({
        id: usr.id,
        nombreUsuario: usr.login,
        nombre: usr.login,
        avatar: usr.avatar_url,
        url: usr.html_url,
        tipo: usr.type
      })))
    );
  }

  obtenerUsuarioPorNombre(nombreUsuario: string): Observable<UsuarioGitHub> {
    return this.http.get<any>(`${this.urlBase}/users/${nombreUsuario}`).pipe(
      map(usr => ({
        id: usr.id,
        nombreUsuario: usr.login,
        nombre: usr.name || usr.login,
        avatar: usr.avatar_url,
        url: usr.html_url,
        tipo: usr.type,
        bio: usr.bio,
        ubicacion: usr.location,
        email: usr.email,
        repositoriosPublicos: usr.public_repos,
        seguidores: usr.followers,
        siguiendo: usr.following,
        creadoEn: usr.created_at
      }))
    );
  }

  obtenerRepositoriosPorUsuario(nombreUsuario: string): Observable<RepositorioGitHub[]> {
    return this.http.get<any[]>(`${this.urlBase}/users/${nombreUsuario}/repos?per_page=10`).pipe(
      map(repos => repos.map(repo => ({
        id: repo.id,
        nombre: repo.name,
        nombreCompleto: repo.full_name,
        descripcion: repo.description || 'Sin descripción',
        url: repo.html_url,
        estrellas: repo.stargazers_count,
        lenguaje: repo.language || 'N/A',
        forks: repo.forks_count,
        abierto: !repo.private
      })))
    );
  }

  buscarUsuarios(termino: string): Observable<UsuarioGitHub[]> {
    return this.http.get<any>(`${this.urlBase}/search/users?q=${termino}&per_page=20`).pipe(
      map(respuesta => respuesta.items.map((usr: any) => ({
        id: usr.id,
        nombreUsuario: usr.login,
        nombre: usr.login,
        avatar: usr.avatar_url,
        url: usr.html_url,
        tipo: usr.type
      })))
    );
  }
}
