# PowerShell script để push cả backend và frontend từ root
# Usage: .\.gitpush-all.ps1 "commit message"

# Kiểm tra xem có thay đổi không
$hasChanges = git diff --quiet; $hasStaged = git diff --cached --quiet

if ($hasChanges -and $hasStaged) {
    Write-Host "No changes to commit"
    exit 0
}

# Add tất cả
git add .

# Commit với message
$commitMessage = if ($args.Count -gt 0) { $args[0] } else { "Update project" }
git commit -m $commitMessage

# Push
git push

Write-Host "✅ All code (backend + frontend) pushed successfully!" -ForegroundColor Green

