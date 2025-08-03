# Bible Maximum - DigitalOcean Deployment Guide

This guide covers deploying your Bible quiz website to DigitalOcean App Platform.

## 🚀 Quick Start

### Prerequisites
- DigitalOcean account
- GitHub repository
- DigitalOcean MCP configured in Claude (optional but recommended)

### Deployment Options

#### Option 1: Using DigitalOcean MCP (Recommended)
```bash
# Once MCP is configured, you can deploy directly through Claude:
# "Deploy my Bible quiz app to DigitalOcean using the app.yaml spec"
```

#### Option 2: Manual Deployment
1. Push your code to GitHub
2. Connect GitHub repo to DigitalOcean App Platform
3. Use the `.do/app.yaml` configuration file

#### Option 3: Using Scripts
```bash
# Linux/Mac
chmod +x scripts/deploy.sh
./scripts/deploy.sh

# Windows PowerShell
./scripts/deploy.ps1
```

## 📁 Deployment Files

### `.do/app.yaml`
- App Platform configuration
- Defines build/run commands
- Sets environment variables
- Configures health checks

### `Dockerfile`
- Multi-stage build for optimal image size
- Production-ready Node.js setup
- Security optimizations

### `docker-compose.prod.yml`
- Production Docker composition
- Health checks and networking
- Environment configuration

## ⚙️ Configuration

### Required Updates Before Deployment

1. **Update GitHub Repository**
   ```yaml
   # In .do/app.yaml, line 7:
   repo: YOUR-GITHUB-USERNAME/bible-quizzes-christian-2025
   ```

2. **Domain Configuration** (Optional)
   ```yaml
   # Uncomment in .do/app.yaml:
   domains:
   - domain: biblemaximum.com
     type: PRIMARY
   ```

3. **Environment Variables**
   - Review `.env.production` template
   - Add any required secrets in DigitalOcean dashboard

## 💰 Pricing Breakdown

### Recommended Setup: $12-18/month
- **App Platform Basic**: $12/month
- **CDN**: $1-2/month
- **Total**: $12-18/month

### With Database (Future): $27/month
- **App Platform**: $12/month  
- **Managed PostgreSQL**: $15/month
- **Total**: $27/month

## 🔧 Production Optimizations

### Performance
- ✅ Next.js standalone output
- ✅ Image optimization enabled
- ✅ Compression enabled
- ✅ SWC minification
- ✅ Multi-stage Docker build

### Security
- ✅ Non-root user in container
- ✅ Telemetry disabled
- ✅ Security headers
- ✅ Health checks

### SEO
- ✅ Static generation
- ✅ Metadata optimization
- ✅ Sitemap generation
- ✅ Structured data markup

## 📊 Monitoring

### Health Checks
- HTTP health check on `/`
- 10-second intervals
- 5-second timeout
- 3 failure retries

### Metrics Available
- Response times
- Error rates  
- Resource usage
- Request volume

## 🚀 Deployment Commands

### Using DigitalOcean MCP
Once you have the MCP configured, you can use these commands in Claude:

```
"Deploy my Bible quiz app to DigitalOcean"
"Show deployment status for bible-maximum app"
"Check logs for my app deployment"
"Scale my app to 2 instances"
"Update environment variables for production"
```

### Manual Commands
```bash
# Build and test locally
npm run build
npm start

# Deploy using DigitalOcean CLI
doctl apps create --spec .do/app.yaml

# Monitor deployment
doctl apps list
doctl apps logs YOUR-APP-ID
```

## 🔄 CI/CD Setup

The app is configured for automatic deployment:
- **Trigger**: Push to `main` branch
- **Build**: `npm run build`
- **Deploy**: Automatic via App Platform
- **Health Check**: Automatic verification

## 🛠️ Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build logs
   npm run build
   # Fix any TypeScript/ESLint errors
   ```

2. **Health Check Failures**
   - Verify app starts on port 3000
   - Check root route `/` responds with 200

3. **Memory Issues**
   - Upgrade to larger instance size
   - Optimize bundle size

### Getting Help
- Check DigitalOcean App Platform logs
- Review build output in dashboard
- Use MCP commands for debugging

## 📈 Scaling Strategy

### Current (Genesis Focus): $12/month
- 1 instance, basic-xxs
- Perfect for current traffic

### Phase 2 (All Books): $18-24/month  
- 1-2 instances, basic-xs
- CDN for global performance

### Phase 3 (High Traffic): $50-100/month
- Multiple instances
- Database for user features
- Advanced monitoring

## 🔐 Security Checklist

- [ ] Environment variables configured
- [ ] HTTPS enabled (automatic)
- [ ] Health checks working
- [ ] No secrets in code
- [ ] Regular dependency updates
- [ ] Security headers configured

Your Bible quiz app is now ready for production deployment! 🎉