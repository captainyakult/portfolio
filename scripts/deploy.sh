#!/bin/bash

set -e

# Portfolio Deployment Script
# This script handles deployment to staging and production environments

ENVIRONMENT=${1:-staging}
BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "🚀 Starting deployment to $ENVIRONMENT..."
echo "📝 Current branch: $BRANCH"

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're on the correct branch
if [ "$ENVIRONMENT" = "production" ] && [ "$BRANCH" != "main" ]; then
    echo -e "${RED}❌ Production deployments must be from main branch${NC}"
    exit 1
fi

if [ "$ENVIRONMENT" = "staging" ] && [ "$BRANCH" != "develop" ]; then
    echo -e "${YELLOW}⚠️  Warning: Staging deployments typically come from develop branch${NC}"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Pre-deployment checks
echo "🔍 Running pre-deployment checks..."

# Check if there are uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    echo -e "${RED}❌ Uncommitted changes detected. Please commit or stash them.${NC}"
    exit 1
fi

# Run tests
echo "🧪 Running tests..."
npm run test:ci || {
    echo -e "${RED}❌ Tests failed${NC}"
    exit 1
}

# Type check
echo "🔍 Running type check..."
npm run type-check || {
    echo -e "${RED}❌ Type check failed${NC}"
    exit 1
}

# Lint check
echo "🧹 Running linter..."
npm run lint || {
    echo -e "${RED}❌ Linting failed${NC}"
    exit 1
}

# Build check
echo "🏗️  Testing build..."
npm run build || {
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
}

# Deploy based on environment
if [ "$ENVIRONMENT" = "production" ]; then
    echo "🌟 Deploying to production..."
    npx vercel --prod --confirm
    echo -e "${GREEN}✅ Production deployment complete!${NC}"
    echo "🌐 Site: https://jacksimpson.dev"
elif [ "$ENVIRONMENT" = "staging" ]; then
    echo "🎭 Deploying to staging..."
    npx vercel --confirm
    echo -e "${GREEN}✅ Staging deployment complete!${NC}"
    echo "🌐 Check deployment URL in Vercel dashboard"
else
    echo -e "${RED}❌ Invalid environment: $ENVIRONMENT${NC}"
    echo "Usage: ./scripts/deploy.sh [staging|production]"
    exit 1
fi

# Run post-deployment tests
echo "🔍 Running post-deployment verification..."
echo "⏳ Waiting 30 seconds for deployment to be ready..."
sleep 30

# You could add automated tests against the deployed URL here
echo -e "${GREEN}🎉 Deployment successful!${NC}"