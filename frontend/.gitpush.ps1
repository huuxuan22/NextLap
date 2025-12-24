# PowerShell script để push chỉ code frontend
# Usage: .\frontend\.gitpush.ps1 "commit message"

$rootDir = Split-Path -Parent $PSScriptRoot
Set-Location $rootDir

# Kiểm tra xem có thay đổi trong frontend không
$frontendChanges = git diff --quiet frontend/; $frontendStaged = git diff --cached --quiet frontend/

if ($frontendChanges -and $frontendStaged) {
    Write-Host "No changes in frontend/"
    exit 0
}

# Add chỉ frontend
git add frontend/

# Commit với message
$commitMessage = if ($args.Count -gt 0) { $args[0] } else { "Update frontend" }
git commit -m $commitMessage

# Push
git push

Write-Host "✅ Frontend code pushed successfully!" -ForegroundColor Green

