import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GitHubService } from '../services/github.service';
import { UsuarioGitHub } from '../models/github.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  usuarios: UsuarioGitHub[] = [];
  cargando: boolean = false;

  constructor(
    private githubService: GitHubService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.githubService.obtenerUsuarios(20).subscribe({
      next: (datos) => {
        this.usuarios = datos;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar usuarios de GitHub:', error);
        this.cargando = false;
      }
    });
  }
}
