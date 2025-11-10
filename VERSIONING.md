# Semantic Versioning Guide

This project uses [Semantic Versioning](https://semver.org/) (SemVer) with [standard-version](https://github.com/conventional-changelog/standard-version) for automated version management.

## Version Format

Versions follow the format: `MAJOR.MINOR.PATCH`

- **MAJOR** (x.0.0): Breaking changes that are not backward compatible
- **MINOR** (0.x.0): New features that are backward compatible
- **PATCH** (0.0.x): Bug fixes and small changes that are backward compatible

## Commit Message Format

This project follows [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `perf`: A performance improvement
- `refactor`: Code refactoring
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `build`: Changes to build system or dependencies
- `ci`: Changes to CI configuration
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

### Examples

```bash
feat(components): add new Hero section with 3D animations
fix(routing): resolve navigation issue on mobile devices
perf(images): optimize image loading with Next.js Image
docs(readme): update installation instructions
chore(deps): upgrade Next.js to 16.0.1
```

## Release Workflow

### Automatic Version Bump (Recommended)

Standard-version automatically determines the version bump based on your commit messages:

```bash
npm run release
```

This will:
1. Analyze commit messages since the last release
2. Determine the appropriate version bump (major/minor/patch)
3. Update `package.json` version
4. Generate/update `CHANGELOG.md`
5. Create a git tag
6. Create a release commit

### Manual Version Bump

If you need to manually specify the version type:

```bash
# Major version (breaking changes)
npm run release:major

# Minor version (new features)
npm run release:minor

# Patch version (bug fixes)
npm run release:patch
```

## Release Process

1. **Ensure all changes are committed:**
   ```bash
   git status
   ```

2. **Run tests and build:**
   ```bash
   npm run test:ci
   npm run build
   ```

3. **Create the release:**
   ```bash
   npm run release
   ```

4. **Review the changes:**
   - Check `CHANGELOG.md` for accuracy
   - Verify `package.json` version is correct
   - Review the git tag

5. **Push to remote:**
   ```bash
   git push --follow-tags origin <branch-name>
   ```

## Current Version

Current version: **0.2.0**

See `CHANGELOG.md` for detailed version history.

## Best Practices

1. **Write clear commit messages** - They become your changelog
2. **Use conventional commit format** - Enables automatic versioning
3. **Release frequently** - Smaller releases are easier to manage
4. **Review CHANGELOG.md** - Always verify before pushing
5. **Tag releases** - Tags help track releases in git history

## Integration with CI/CD

The versioning system integrates with your CI/CD pipeline:

- **GitHub Actions**: Can trigger on version tags
- **Vercel**: Automatically deploys tagged releases
- **Automated Testing**: Run tests before creating a release

## Troubleshooting

### Reset a Release

If you need to undo a release:

```bash
# Remove the tag
git tag -d v0.2.0
git push origin :refs/tags/v0.2.0

# Reset the commit (if not pushed)
git reset --hard HEAD~1
```

### Skip Hooks

If you need to skip git hooks during release:

```bash
HUSKY=0 npm run release
```

## Resources

- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [standard-version Documentation](https://github.com/conventional-changelog/standard-version)

