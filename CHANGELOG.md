# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.2.0] - 2025-11-10

### Build System

- **BREAKING**: Upgrade Next.js from 14.2.33 to 16.0.1
- **BREAKING**: Upgrade React from 18.2.0 to 19.2.0
- **BREAKING**: Upgrade React DOM from 18.2.0 to 19.2.0
- Upgrade @react-three/fiber from 8.18.0 to 9.4.0
- Upgrade @react-three/drei from 9.122.0 to 10.7.6
- Update TypeScript type definitions (@types/react and @types/react-dom to v19)

### Bug Fixes

- Fix TypeScript errors for React Three Fiber with React 19 by adding type declarations
- Fix sitemap route handler to always return a response (Next.js 16 compatibility)

### Features

- Add semantic versioning system with standard-version
- Add CHANGELOG.md for tracking version history
- Add Next.js DevTools MCP integration support

[0.2.0]: https://github.com/jacksimpson/portfolio/compare/v0.1.0...v0.2.0

