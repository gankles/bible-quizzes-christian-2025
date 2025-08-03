#!/bin/bash

# Bible Maximum - DigitalOcean Deployment Script

set -e  # Exit on any error

echo "🚀 Starting Bible Maximum deployment to DigitalOcean..."

# Check if required tools are installed
check_dependencies() {
    echo "📋 Checking dependencies..."
    
    if ! command -v git &> /dev/null; then
        echo "❌ Git is required but not installed."
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is required but not installed."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo "❌ npm is required but not installed."
        exit 1
    fi
    
    echo "✅ All dependencies are available"
}

# Run tests and build
run_tests() {
    echo "🧪 Running tests and build..."
    
    # Install dependencies
    npm ci
    
    # Type check (if TypeScript)
    if [ -f "tsconfig.json" ]; then
        echo "🔍 Running TypeScript type check..."
        npx tsc --noEmit
    fi
    
    # Lint check
    if npm run lint &> /dev/null; then
        echo "🔍 Running ESLint..."
        npm run lint
    fi
    
    # Build the application
    echo "🏗️ Building application..."
    npm run build
    
    echo "✅ Build completed successfully"
}

# Deploy to DigitalOcean
deploy_to_digitalocean() {
    echo "🌊 Deploying to DigitalOcean App Platform..."
    
    # Check if we have the DO CLI or MCP
    if command -v doctl &> /dev/null; then
        echo "📱 Using DigitalOcean CLI..."
        # Deploy using doctl
        doctl apps create --spec .do/app.yaml
    else
        echo "📡 Please ensure you have:"
        echo "  1. DigitalOcean MCP configured in Claude"
        echo "  2. Your GitHub repository connected"
        echo "  3. The .do/app.yaml file configured"
        echo ""
        echo "Once configured, your app will deploy automatically on git push to main branch"
    fi
}

# Update environment for production
setup_production_env() {
    echo "⚙️ Setting up production environment..."
    
    # Create production environment file template
    if [ ! -f ".env.production" ]; then
        cat > .env.production << EOF
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
# Add your production environment variables here
# DATABASE_URL=your_database_url_here
# NEXTAUTH_SECRET=your_secret_here
EOF
        echo "📝 Created .env.production template"
        echo "⚠️ Please update .env.production with your actual values"
    fi
}

# Main deployment flow
main() {
    echo "📖 Bible Maximum - DigitalOcean Deployment"
    echo "==========================================="
    
    check_dependencies
    setup_production_env
    run_tests
    deploy_to_digitalocean
    
    echo ""
    echo "🎉 Deployment process completed!"
    echo "📊 Your Bible quiz app should be deploying to DigitalOcean"
    echo "🔗 Check your DigitalOcean dashboard for deployment status"
    echo "💡 Domain: https://your-app-name.ondigitalocean.app"
}

# Run main function
main "$@"