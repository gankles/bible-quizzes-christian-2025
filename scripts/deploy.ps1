# Bible Maximum - DigitalOcean Deployment Script (Windows PowerShell)

param(
    [switch]$SkipTests = $false,
    [switch]$SkipBuild = $false
)

Write-Host "🚀 Starting Bible Maximum deployment to DigitalOcean..." -ForegroundColor Green

# Check if required tools are installed
function Test-Dependencies {
    Write-Host "📋 Checking dependencies..." -ForegroundColor Yellow
    
    $dependencies = @('git', 'node', 'npm')
    $missing = @()
    
    foreach ($dep in $dependencies) {
        if (!(Get-Command $dep -ErrorAction SilentlyContinue)) {
            $missing += $dep
        }
    }
    
    if ($missing.Count -gt 0) {
        Write-Host "❌ Missing dependencies: $($missing -join ', ')" -ForegroundColor Red
        Write-Host "Please install the missing dependencies and try again." -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ All dependencies are available" -ForegroundColor Green
}

# Run tests and build
function Invoke-TestsAndBuild {
    if ($SkipTests) {
        Write-Host "⏭️ Skipping tests (--SkipTests flag used)" -ForegroundColor Yellow
        return
    }
    
    Write-Host "🧪 Running tests and build..." -ForegroundColor Yellow
    
    try {
        # Install dependencies
        Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
        npm ci
        
        # Type check (if TypeScript)
        if (Test-Path "tsconfig.json") {
            Write-Host "🔍 Running TypeScript type check..." -ForegroundColor Cyan
            npx tsc --noEmit
        }
        
        # Lint check
        $lintScript = (Get-Content "package.json" | ConvertFrom-Json).scripts.lint
        if ($lintScript) {
            Write-Host "🔍 Running ESLint..." -ForegroundColor Cyan
            npm run lint
        }
        
        # Build the application
        if (!$SkipBuild) {
            Write-Host "🏗️ Building application..." -ForegroundColor Cyan
            npm run build
        }
        
        Write-Host "✅ Build completed successfully" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Build failed: $_" -ForegroundColor Red
        exit 1
    }
}

# Deploy to DigitalOcean
function Deploy-ToDigitalOcean {
    Write-Host "🌊 Preparing deployment to DigitalOcean App Platform..." -ForegroundColor Yellow
    
    # Check if we have the DO CLI
    if (Get-Command doctl -ErrorAction SilentlyContinue) {
        Write-Host "📱 DigitalOcean CLI detected" -ForegroundColor Green
        try {
            Write-Host "🚀 Creating app deployment..." -ForegroundColor Cyan
            doctl apps create --spec .do/app.yaml
            Write-Host "✅ Deployment initiated successfully" -ForegroundColor Green
        }
        catch {
            Write-Host "❌ Deployment failed: $_" -ForegroundColor Red
            Write-Host "Please check your DigitalOcean CLI configuration" -ForegroundColor Yellow
        }
    }
    else {
        Write-Host "📡 DigitalOcean CLI not found. Please ensure you have:" -ForegroundColor Yellow
        Write-Host "  1. DigitalOcean MCP configured in Claude" -ForegroundColor White
        Write-Host "  2. Your GitHub repository connected to DigitalOcean" -ForegroundColor White
        Write-Host "  3. The .do/app.yaml file properly configured" -ForegroundColor White
        Write-Host ""
        Write-Host "Once configured, your app will deploy automatically on git push to main branch" -ForegroundColor Cyan
    }
}

# Setup production environment
function Set-ProductionEnvironment {
    Write-Host "⚙️ Setting up production environment..." -ForegroundColor Yellow
    
    if (!(Test-Path ".env.production")) {
        $envContent = @"
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
# Add your production environment variables here
# DATABASE_URL=your_database_url_here
# NEXTAUTH_SECRET=your_secret_here
"@
        $envContent | Out-File -FilePath ".env.production" -Encoding UTF8
        Write-Host "📝 Created .env.production template" -ForegroundColor Green
        Write-Host "⚠️ Please update .env.production with your actual values" -ForegroundColor Yellow
    }
}

# Git commit and push
function Invoke-GitDeploy {
    Write-Host "📤 Preparing Git deployment..." -ForegroundColor Yellow
    
    # Check git status
    $gitStatus = git status --porcelain
    if ($gitStatus) {
        Write-Host "📋 Uncommitted changes detected:" -ForegroundColor Yellow
        git status --short
        
        $commit = Read-Host "Do you want to commit and push these changes? (y/N)"
        if ($commit -eq 'y' -or $commit -eq 'Y') {
            $commitMessage = Read-Host "Enter commit message (or press Enter for default)"
            if (!$commitMessage) {
                $commitMessage = "Deploy Bible Maximum - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
            }
            
            git add .
            git commit -m "$commitMessage"
            git push origin main
            
            Write-Host "✅ Changes committed and pushed to main branch" -ForegroundColor Green
        }
    }
    else {
        Write-Host "📤 Pushing latest changes to main branch..." -ForegroundColor Cyan
        git push origin main
        Write-Host "✅ Code pushed successfully" -ForegroundColor Green
    }
}

# Main deployment flow
function Start-Deployment {
    Write-Host "📖 Bible Maximum - DigitalOcean Deployment" -ForegroundColor Magenta
    Write-Host "===========================================" -ForegroundColor Magenta
    
    Test-Dependencies
    Set-ProductionEnvironment
    Invoke-TestsAndBuild
    Invoke-GitDeploy
    Deploy-ToDigitalOcean
    
    Write-Host ""
    Write-Host "🎉 Deployment process completed!" -ForegroundColor Green
    Write-Host "📊 Your Bible quiz app should be deploying to DigitalOcean" -ForegroundColor Cyan
    Write-Host "🔗 Check your DigitalOcean dashboard for deployment status" -ForegroundColor Cyan
    Write-Host "💡 Domain: https://your-app-name.ondigitalocean.app" -ForegroundColor Yellow
}

# Run main function
Start-Deployment