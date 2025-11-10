# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 0.2.0 (2025-11-10)


### Features

* Complete Next.js portfolio website with 3D elements and CI/CD ([5356909](https://github.com/captainyakult/portfolio/commit/53569094b51888d630cc885b969ebf808b5f1a90))
* integrate Biome CI and fix hydration errors ([9061499](https://github.com/captainyakult/portfolio/commit/90614999fd5da1f185ca377f09e7dcf4c28e9b1a))
* upgrade to Next.js 16 and React 19 ([00bbc12](https://github.com/captainyakult/portfolio/commit/00bbc12af70d18329cf7cae2395f4d7cab7ab5b1))


### Build System

* add semantic versioning system ([a88192c](https://github.com/captainyakult/portfolio/commit/a88192c6ef55bfa909d8a5cd7b20c9347d072a16))

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
