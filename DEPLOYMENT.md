# 🚀 Deployment Guide

## Overview

This portfolio uses a modern CI/CD pipeline with GitHub Actions, automated testing, and environment-based deployments. We support both staging and production environments with comprehensive quality gates.

## 🏗️ Architecture

```
┌─ GitHub Repository ─┐    ┌─ GitHub Actions ─┐    ┌─ Vercel ─┐
│                     │    │                  │    │         │
│ main branch    ────►│───►│ Production CI/CD ├───►│ Production
│ develop branch ────►│───►│ Staging CI/CD   ├───►│ Staging  │
│                     │    │                  │    │         │
└─────────────────────┘    └──────────────────┘    └─────────┘
```

## 🌍 Environments

### Production
- **Domain**: `jacksimpson.dev`
- **Branch**: `main`
- **Auto-deploy**: ✅ On push to main
- **Quality Gates**: All tests + E2E + Performance audit

### Staging  
- **Domain**: `{branch}-portfolio.vercel.app`
- **Branch**: `develop`
- **Auto-deploy**: ✅ On push to develop
- **Quality Gates**: All tests + E2E

## 🔄 CI/CD Pipeline

### Quality Gates (All Environments)
1. **Linting**: ESLint + Prettier
2. **Type Checking**: TypeScript compilation
3. **Unit Tests**: Jest with React Testing Library
4. **Build Verification**: Next.js build success
5. **E2E Tests**: Playwright across browsers
6. **Performance Audit**: Lighthouse CI (staging only)

### Pipeline Steps
```yaml
┌─ Code Push ─┐
       │
   ┌───▼────┐
   │ Lint & │
   │ Type   │
   │ Check  │
   └───┬────┘
       │
   ┌───▼────┐
   │ Unit   │
   │ Tests  │
   └───┬────┘
       │
   ┌───▼────┐
   │ Build  │
   │ Check  │
   └───┬────┘
       │
   ┌───▼────┐
   │  E2E   │
   │ Tests  │
   └───┬────┘
       │
   ┌───▼────┐
   │ Deploy │
   │   to   │
   │  Env   │
   └────────┘
```

## ⚙️ Setup Instructions

### 1. GitHub Repository Setup

1. **Create Repository Secrets**:
   ```
   VERCEL_TOKEN          - Vercel API token
   VERCEL_ORG_ID         - Vercel organization ID  
   VERCEL_PROJECT_ID     - Vercel project ID
   LHCI_GITHUB_APP_TOKEN - Lighthouse CI token (optional)
   ```

2. **Branch Protection Rules** (Recommended):
   - `main`: Require PR reviews + status checks
   - `develop`: Require status checks

### 2. Vercel Project Setup

1. **Connect Repository**:
   ```bash
   npx vercel login
   npx vercel link
   ```

2. **Configure Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Environment Variables**:
   ```
   Production:
   - NODE_ENV=production
   - NEXT_PUBLIC_SITE_URL=https://jacksimpson.dev
   
   Staging:  
   - NODE_ENV=staging
   - NEXT_PUBLIC_SITE_URL=https://staging-jacksimpson.vercel.app
   ```

### 3. Local Development Setup

```bash
# Install dependencies
npm install

# Setup pre-commit hooks
npm run prepare

# Run development server
npm run dev
```

## 🧪 Testing Strategy

### Unit Tests (Jest)
- **Coverage Target**: >80%
- **Focus**: Component logic, utilities, hooks
- **Run**: `npm test` (watch mode) or `npm run test:ci`

### E2E Tests (Playwright)
- **Browsers**: Chrome, Firefox, Safari, Mobile
- **Focus**: User journeys, critical paths
- **Run**: `npm run test:e2e` or `npm run test:e2e:ui`

### Performance Tests (Lighthouse)
- **Metrics**: Performance, Accessibility, SEO, Best Practices
- **Thresholds**: Performance >80%, Accessibility >95%
- **Run**: Automatically on staging deployments

## 📋 Deployment Checklist

### Before Deployment
- [ ] All tests passing locally
- [ ] No uncommitted changes
- [ ] Branch is up to date
- [ ] Code review completed (for main)

### Manual Deployment
```bash
# Staging
./scripts/deploy.sh staging

# Production  
./scripts/deploy.sh production
```

### Post-Deployment
- [ ] Site loads correctly
- [ ] All navigation working
- [ ] 3D elements rendering
- [ ] Mobile responsiveness
- [ ] Performance metrics acceptable

## 🚨 Rollback Procedures

### Quick Rollback (Vercel)
```bash
# List recent deployments
npx vercel list

# Promote previous deployment  
npx vercel promote [deployment-url] --scope=[team]
```

### Git Rollback
```bash
# Create rollback branch
git checkout main
git checkout -b rollback/fix-deployment
git revert [commit-hash]
git push origin rollback/fix-deployment

# Create PR to main
```

## 📊 Monitoring & Alerts

### Performance Monitoring
- **Lighthouse CI**: Automated performance auditing
- **Vercel Analytics**: Real-time performance metrics
- **Web Vitals**: Core performance indicators

### Error Tracking (Optional)
- **Setup Sentry**: Add `SENTRY_DSN` to environment variables
- **Custom Error Boundary**: Implemented in layout

### Uptime Monitoring (Recommended)
- **Setup**: External service (UptimeRobot, Pingdom)
- **Endpoints**: 
  - `https://jacksimpson.dev/`
  - `https://jacksimpson.dev/projects`
  - `https://jacksimpson.dev/experiments`

## 🛠️ Troubleshooting

### Build Failures
```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Clear node_modules
rm -rf node_modules
npm install
npm run build
```

### Test Failures
```bash
# Update test snapshots
npm test -- --updateSnapshot

# Run specific test
npm test -- Navigation.test.tsx

# Debug E2E tests
npm run test:e2e:ui
```

### Deployment Issues
```bash
# Check Vercel logs
npx vercel logs [deployment-url]

# Force redeploy
npx vercel --force

# Check build environment
npx vercel env ls
```

## 📈 Performance Optimization

### Build Optimization
- **Bundle Analysis**: Run `npm run analyze` (if added)
- **Image Optimization**: Using Next.js Image component
- **Code Splitting**: Automatic route-based splitting

### Runtime Optimization  
- **3D Performance**: Efficient geometry and materials
- **Loading States**: Suspense boundaries for 3D content
- **Caching**: Static generation where possible

## 🔒 Security

### Headers
- Security headers configured in `vercel.json`
- Content Security Policy (CSP) ready
- XSS protection enabled

### Dependencies
- **Audit**: Run `npm audit` regularly
- **Updates**: Dependabot configured
- **Scanning**: GitHub security alerts enabled

---

## Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Quality
npm run lint            # Run ESLint  
npm run type-check      # TypeScript check
npm test                # Run unit tests
npm run test:e2e        # Run E2E tests

# Deployment
./scripts/deploy.sh staging     # Deploy to staging
./scripts/deploy.sh production  # Deploy to production
```

For questions or issues, refer to the main [README.md](./README.md) or create an issue in the repository.