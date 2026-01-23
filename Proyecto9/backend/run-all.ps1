<#
Run-all PowerShell helper for Proyecto9 backend.
Usage (PowerShell):
  .\run-all.ps1

What it does:
 - copies .env.example to .env if .env does not exist
 - installs npm dependencies (npm install)
 - runs seed script (npm run seed)
 - starts the server in dev mode (npm run dev)

Note: This script executes commands in the backend folder. It does NOT run MongoDB; ensure Mongo is running locally.
#>

$ErrorActionPreference = 'Stop'

Write-Host "Running run-all.ps1 for Proyecto9 backend..."

if (-not (Test-Path -Path ".env")) {
  if (Test-Path -Path ".env.example") {
    Copy-Item -Path ".env.example" -Destination ".env"
    Write-Host "Copied .env.example to .env (edit .env if needed)."
  } else {
    Write-Warning ".env.example not found. Make sure to create a .env with MONGO_URI and JWT_SECRET."
  }
} else {
  Write-Host ".env already exists."
}

Write-Host "Installing npm dependencies (this may take a while)..."
npm install

Write-Host "Running seed script (npm run seed)..."
npm run seed

Write-Host "Starting server in dev mode (npm run dev)..."
Write-Host "If you want to stop, press Ctrl+C in this terminal."
npm run dev
