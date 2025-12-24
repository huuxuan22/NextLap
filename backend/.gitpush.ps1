# PowerShell script để push chỉ code backend
# Usage: .\backend\.gitpush.ps1 "commit message"

$rootDir = Split-Path -Parent $PSScriptRoot
Set-Location $rootDir

# Kiểm tra xem có thay đổi trong backend không
$backendChanges = git diff --quiet backend/; $backendStaged = git diff --cached --quiet backend/

if ($backendChanges -and $backendStaged) {
    Write-Host "No changes in backend/"
    exit 0
}

# Add chỉ backend
git add backend/

# Commit với message
$commitMessage = if ($args.Count -gt 0) { $args[0] } else { "Update backend" }
git commit -m $commitMessage

# Push
git push

Write-Host "✅ Backend code pushed successfully!" -ForegroundColor Green

