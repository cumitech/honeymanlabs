# Security maintenance

## React2Shell / RSC (CVE-2025-55182, CVE-2025-66478, follow-on advisories)

This app uses **Next.js App Router** with **React 19** (RSC). Stay on **patched Next.js releases** in your minor line.

### Pinned versions (see `package.json`)

| Package            | Role                                      |
| ------------------ | ----------------------------------------- |
| `next`             | **15.3.8** — includes React2Shell & related RSC fixes for the 15.3 line |
| `eslint-config-next` | **15.3.8** — aligned with Next            |
| `react` / `react-dom` | **19.1.0** — follow React security releases as needed |

**Note:** Do **not** manually pin `@next/swc-*` platform packages unless a vendor documents it—those binaries track the `next` release and may use different patch numbers. `next` pulls the correct optional compiler for your OS.

### After upgrading

1. **Deploy** the new build so production matches `package.json` / `package-lock.json`.
2. **Rotate secrets** (API keys, DB URLs, signing keys) if the app was ever internet-exposed while running a vulnerable Next.js build ([Vercel guidance](https://nextjs.org/blog/CVE-2025-66478)).
3. **Optional:** run the official checker:

   ```bash
   npm run security:react2shell
   ```

   or: `npx fix-react2shell-next`

### Node.js

Use **Node 20.19+** (or 22.13+) in production/CI when possible—some ESLint tooling warns on older 20.x patch levels.

### Clean install (if lockfile / SWC warnings appear)

```bash
rm -rf node_modules
npm install
```

On Windows (PowerShell): remove `node_modules`, then `npm install`.

If `next build` prints **“Failed to patch lockfile”** / **“lockfile missing swc dependencies”** but the build still completes, that is a known Next.js tooling quirk in some environments—a clean reinstall usually reduces the noise. Ensure CI uses the committed `package-lock.json` and a supported Node version.

### References

- [Next.js CVE-2025-66478 (React2Shell)](https://nextjs.org/blog/CVE-2025-66478)
- [Later RSC advisories (Dec 2025)](https://nextjs.org/blog/security-update-2025-12-11)
- [React RSC security posts](https://react.dev/blog)
