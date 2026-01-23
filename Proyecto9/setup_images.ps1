# Script para crear imágenes placeholder para el proyecto Marvel
# PowerShell script

Write-Host "🦸 Creando imágenes placeholder para el proyecto Marvel..." -ForegroundColor Red

# Rutas
$imgPath = ".\img"
$heroesPath = ".\img\heroes"
$moviesPath = ".\img\movies"
$backgroundsPath = ".\img\backgrounds"

# Crear directorios si no existen
if (!(Test-Path $heroesPath)) {
    New-Item -ItemType Directory -Path $heroesPath -Force
    Write-Host "✅ Creado directorio: $heroesPath" -ForegroundColor Green
}

if (!(Test-Path $moviesPath)) {
    New-Item -ItemType Directory -Path $moviesPath -Force
    Write-Host "✅ Creado directorio: $moviesPath" -ForegroundColor Green
}

if (!(Test-Path $backgroundsPath)) {
    New-Item -ItemType Directory -Path $backgroundsPath -Force
    Write-Host "✅ Creado directorio: $backgroundsPath" -ForegroundColor Green
}

# Lista de héroes que necesitan imágenes
$heroes = @(
    "Ironman.jpg", "spiderman.jpg", "captainamerica.jpg", "thor.jpg", 
    "hulk.jpg", "blackwidow.jpg", "blackpanther.jpg", "doctorstrange.jpg",
    "wolverine.jpg", "storm.jpg", "cyclops.jpg", "starlord.jpg",
    "default.jpg"
)

# Lista de películas que necesitan imágenes
$movies = @(
    "avengers.jpg", "ironman1.jpg", "ironman2.jpg", "ironman3.jpg",
    "thor1.jpg", "thor2.jpg", "thor3.jpg", "captain1.jpg", 
    "captain2.jpg", "captain3.jpg", "spiderman1.jpg", "spiderman2.jpg",
    "hulk1.jpg", "blackwidow.jpg", "blackpanther.jpg", "doctorstrange1.jpg",
    "guardians1.jpg", "guardians2.jpg", "xmen1.jpg", "xmen2.jpg"
)

# Lista de fondos/backgrounds
$backgrounds = @(
    "marvel-bg.jpg", "avengers-bg.jpg", "xmen-bg.jpg", "guardians-bg.jpg"
)

Write-Host "📸 Creando imágenes placeholder para héroes..." -ForegroundColor Yellow

# Crear imágenes placeholder para héroes
foreach ($hero in $heroes) {
    $heroFile = Join-Path $heroesPath $hero
    if (!(Test-Path $heroFile)) {
        # Crear un archivo de texto temporal como placeholder
        $placeholder = @"
PLACEHOLDER IMAGE
Hero: $hero
Size: 350x450px
Format: JPG
Marvel Heroes Database
"@
        $placeholder | Out-File -FilePath $heroFile -Encoding UTF8
        Write-Host "   📝 Created placeholder: $hero" -ForegroundColor Cyan
    }
}

Write-Host "🎬 Creando imágenes placeholder para películas..." -ForegroundColor Yellow

# Crear imágenes placeholder para películas
foreach ($movie in $movies) {
    $movieFile = Join-Path $moviesPath $movie
    if (!(Test-Path $movieFile)) {
        $placeholder = @"
PLACEHOLDER IMAGE
Movie: $movie
Size: 300x450px
Format: JPG
Marvel Movies Database
"@
        $placeholder | Out-File -FilePath $movieFile -Encoding UTF8
        Write-Host "   📝 Created placeholder: $movie" -ForegroundColor Cyan
    }
}

Write-Host "🎨 Creando imágenes placeholder para fondos..." -ForegroundColor Yellow

# Crear imágenes placeholder para fondos
foreach ($bg in $backgrounds) {
    $bgFile = Join-Path $backgroundsPath $bg
    if (!(Test-Path $bgFile)) {
        $placeholder = @"
PLACEHOLDER IMAGE
Background: $bg
Size: 1920x1080px
Format: JPG
Marvel Background Database
"@
        $placeholder | Out-File -FilePath $bgFile -Encoding UTF8
        Write-Host "   📝 Created placeholder: $bg" -ForegroundColor Cyan
    }
}

Write-Host "📋 Creando README para imágenes..." -ForegroundColor Yellow

# Crear README para la carpeta img
$readmeContent = @"
# Marvel Heroes Database - Imágenes

## Estructura de Directorios

### `/img/heroes/`
Imágenes de los héroes (350x450px recomendado)
- Nombres de archivos: `nombreheroe.jpg`
- Formato: JPG

### `/img/movies/`
Imágenes de películas (300x450px recomendado)
- Nombres de archivos: `nombrepelicula.jpg`
- Formato: JPG

### `/img/backgrounds/`
Imágenes de fondo y backgrounds (1920x1080px recomendado)
- Nombres de archivos: `nombre-bg.jpg`
- Formato: JPG

### Archivos Principales
- `logo.png` - Logo principal de Marvel
- `fondo.jpg` - Fondo principal del sitio

## Notas
- Los archivos actuales son placeholders
- Reemplazar con imágenes reales de alta calidad
- Mantener nombres consistentes con el código
- Optimizar imágenes para web

## Héroes Requeridos
$($heroes -join ', ')

## Películas Requeridas  
$($movies -join ', ')
"@

$readmeContent | Out-File -FilePath ".\img\README.md" -Encoding UTF8

Write-Host "✅ ¡Configuración de imágenes completada!" -ForegroundColor Green
Write-Host "📁 Estructura creada en: $imgPath" -ForegroundColor Blue
Write-Host "🔄 Reemplaza los placeholders con imágenes reales" -ForegroundColor Yellow
Write-Host "🚀 Ahora puedes hacer commit de los cambios" -ForegroundColor Green
