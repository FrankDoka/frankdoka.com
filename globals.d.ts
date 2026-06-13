// Side-effect imports of CSS files (e.g. `import '@/style/tailwind.css'`)
// need a module declaration starting with TypeScript 6, which tightened
// checking for untyped side-effect imports. Without this Next.js can't
// type-check `src/app/layout.tsx` and the build fails.
declare module '*.css'
