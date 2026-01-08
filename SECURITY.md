# Security

## Known Vulnerabilities

### d3-color (High Severity - ReDoS)

**Status:** Known limitation, cannot be fixed without breaking changes

**Affected Dependency Chain:**
- `@carbonplan/maps@3.6.0` → `d3-scale@2.2.2` → `d3-interpolate@1.4.0` → `d3-color@1.4.1`

**Issue:**
The `d3-color` package version 1.4.1 (used transitively through `@carbonplan/maps`) has a known ReDoS (Regular Expression Denial of Service) vulnerability. The secure version (`d3-color@3.1.0+`) cannot be used because:

1. `d3-scale@2.2.2` (required by `@carbonplan/maps@3.6.0`) requires `d3-interpolate@1.x`
2. All `d3-interpolate@1.x` versions require `d3-color@1.x` (vulnerable)
3. `d3-color@3.x` and `d3-interpolate@3.x` are ESM-only modules
4. `d3-scale@2.2.2` uses CommonJS and cannot `require()` ESM modules

**Impact:**
- **Severity:** High
- **Type:** ReDoS (Regular Expression Denial of Service)
- **CVEs:** [GHSA-36jr-mh4h-2g58](https://github.com/advisories/GHSA-36jr-mh4h-2g58)

**Mitigation:**
- This vulnerability is in a transitive dependency used only for color interpolation in map rendering
- The risk is limited to potential denial of service if malicious input is processed through color interpolation functions
- In practice, this is low risk for this application as color values are controlled internally

**Resolution:**
Waiting for `@carbonplan/maps` to upgrade to a newer `d3-scale` version (4.x) that supports ESM-compatible `d3-interpolate`/`d3-color` packages.

**Last Updated:** 2025-01-08

---

## Reporting Security Issues

If you discover a security vulnerability, please report it responsibly:

1. **Do not** open a public issue
2. Contact the maintainers directly
3. Provide details about the vulnerability
4. Allow time for the issue to be addressed before public disclosure

## Dependency Updates

This project uses:
- **React:** 18.3.1
- **Next.js:** 14.2.35
- **Carbonplan packages:** Latest compatible versions (as of 2026-01-08)

Regular dependency audits are recommended. Run `npm audit` to check for new vulnerabilities.

