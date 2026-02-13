# Script para crear imágenes de películas usando las existentes
# PowerShell script - Solución inmediata para películas

Write-Host "🎬 Creando imágenes para películas..." -ForegroundColor Red

# Mapeo de películas -> imágenes existentes
$movieMapping = @{
    "ironman.jpg" = "heroes/ironman1.jpg"
    "hulk.jpg" = "heroes/Hulk.jpg"
    "ironman2.jpg" = "heroes/ironman2.jpg"
    "thor.jpg" = "heroes/thor1.jpg"
    "captainamerica.jpg" = "heroes/CapitanAmerica.jpg"
    "avengers.jpg" = "avangers0.jpg"
    "ironman3.jpg" = "heroes/ironman2.jpg"
    "thor2.jpg" = "heroes/thor2.jpg"
    "wintersoldier.jpg" = "heroes/CapitanAmerica.jpg"
    "guardians.jpg" = "heroes/Halcon.jpg"
    "ultron.jpg" = "avangers1.jpg"
    "antman.jpg" = "heroes/DrStrange.jpg"
    "civilwar.jpg" = "heroes/CapitanAmerica.jpg"
    "doctorstrange.jpg" = "heroes/DrStrange.jpg"
    "spiderman.jpg" = "heroes/CapitanAmerica.jpg"
    "blackpanther.jpg" = "heroes/Blackpanter.jpg"
    "infinitywar.jpg" = "avangers2.jpg"
    "endgame.jpg" = "avangers3.jpg"
}

# Crear imágenes de películas
foreach ($movie in $movieMapping.Keys) {
    $sourceImage = $movieMapping[$movie]
    $moviePath = "img/movies/$movie"
    $sourcePath = "img/$sourceImage"
    
    if (Test-Path $sourcePath) {
        Copy-Item $sourcePath $moviePath -Force
        Write-Host "✅ $movie <- $sourceImage" -ForegroundColor Green
    } else {
        Write-Host "❌ No encontrado: $sourcePath" -ForegroundColor Red
    }
}

Write-Host "🎬 Imágenes de películas creadas!" -ForegroundColor Green
