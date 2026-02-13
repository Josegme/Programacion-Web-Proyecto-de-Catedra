# Script para corregir imágenes usando las existentes
# PowerShell script - Corrección inmediata para presentación

Write-Host "🦸 Corrigiendo imágenes para presentación..." -ForegroundColor Red

# Mapeo de imágenes placeholder -> imágenes reales existentes
$imageMapping = @{
    "Ironman.jpg" = "ironman1.jpg"
    "Spiderman.jpg" = "CapitanAmerica.jpg"  # Temporal - usar similar
    "Thor.jpg" = "thor1.jpg"
    "wolverine.jpg" = "Halcon.jpg"  # Temporal - usar similar
    "blackpanther.jpg" = "Blackpanter.jpg"
    "captainamerica.jpg" = "CapitanAmerica.jpg"
    "cyclops.jpg" = "DrStrange.jpg"  # Temporal - usar similar
    "doctorstrange.jpg" = "DrStrange.jpg"
    "storm.jpg" = "BlackWidow1.jpg"  # Temporal - usar similar
    "starlord.jpg" = "ironman2.jpg"  # Temporal - usar similar
    "BlackWidow.jpg" = "BlackWidow1.jpg"
    "default.jpg" = "CapitanAmerica.jpg"
}

# Aplicar correcciones
foreach ($placeholder in $imageMapping.Keys) {
    $realImage = $imageMapping[$placeholder]
    $placeholderPath = "img/heroes/$placeholder"
    $realImagePath = "img/heroes/$realImage"
    
    if (Test-Path $realImagePath) {
        Copy-Item $realImagePath $placeholderPath -Force
        Write-Host "✅ $placeholder <- $realImage" -ForegroundColor Green
    } else {
        Write-Host "❌ No encontrado: $realImagePath" -ForegroundColor Red
    }
}

Write-Host "🎯 Imágenes corregidas para presentación!" -ForegroundColor Green
Write-Host "🔄 Recomiendo descargar imágenes reales después" -ForegroundColor Yellow
