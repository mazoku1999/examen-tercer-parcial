# Instrucciones para Desplegar en GitHub Pages

## Pasos a seguir:

### 1. Crear repositorio en GitHub
1. Ve a https://github.com/new
2. Nombre del repositorio: `examen-tercer-parcial` (o el que prefieras)
3. **NO** marques "Initialize this repository with a README"
4. Haz clic en "Create repository"

### 2. Conectar tu repositorio local con GitHub

Copia la URL de tu nuevo repositorio (algo como `https://github.com/TU_USUARIO/examen-tercer-parcial.git`) y ejecuta:

```bash
git remote add origin https://github.com/TU_USUARIO/examen-tercer-parcial.git
```

### 3. Hacer commit de todos los cambios

```bash
git add .
git commit -m "Proyecto final - 8 APIs integradas"
git branch -M main
git push -u origin main
```

### 4. Desplegar a GitHub Pages

```bash
npm run deploy
```

Este comando:
- Construye la aplicación en modo producción
- Crea/actualiza la rama `gh-pages`
- Sube los archivos compilados a GitHub

### 5. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en "Settings" (Configuración)
3. En el menú lateral, haz clic en "Pages"
4. En "Source", selecciona la rama `gh-pages`
5. Haz clic en "Save"

### 6. Acceder a tu aplicación

Tu aplicación estará disponible en:
```
https://TU_USUARIO.github.io/examen-tercer-parcial/
```

**Nota:** Puede tardar 1-2 minutos en estar disponible la primera vez.

---

## Comandos útiles:

- **Actualizar el sitio después de cambios:**
  ```bash
  git add .
  git commit -m "Descripción de cambios"
  git push
  npm run deploy
  ```

- **Ver estado de git:**
  ```bash
  git status
  ```

- **Ver remotes configurados:**
  ```bash
  git remote -v
  ```

---

## Estructura del proyecto

### APIs integradas (8):
1. **Países** - REST Countries API (América Latina)
2. **Clima** - Open-Meteo API (9 departamentos de Bolivia)
3. **Usuarios** - GitHub API
4. **Pokémon** - PokéAPI
5. **Rick & Morty** - Rick and Morty API
6. **Crypto** - CoinGecko API
7. **Gatos** - The Cat API
8. **Ghibli Films** - Studio Ghibli API

### Tecnologías:
- Angular 20.3.0
- Tailwind CSS v3
- Lucide Angular (iconos)
- TypeScript
- RxJS
