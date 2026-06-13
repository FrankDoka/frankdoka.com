import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vitest/config'

const mockDir = path.resolve(__dirname, 'src/test/__mocks__')

export default defineConfig({
  plugins: [
    react(),
    {
      // Treat static assets as simple objects so next/image mocks work
      name: 'mock-static-assets',
      transform(_, id) {
        if (/\.(png|jpg|jpeg|gif|webp|woff2?)$/.test(id)) {
          return { code: 'export default { src: "/mock-image.png", width: 100, height: 100 }' }
        }
        if (/\.svg$/.test(id)) {
          return { code: 'export default { src: "/mock.svg", width: 24, height: 24 }' }
        }
      },
    },
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/test/unit/**/*.test.{ts,tsx}', 'src/test/integration/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/test/**', 'src/app/**/*.mdx', 'src/app/layout.tsx'],
    },
  },
  resolve: {
    alias: [
      { find: /^@\//, replacement: path.resolve(__dirname, 'src') + '/' },
      { find: /^@public\//, replacement: path.resolve(__dirname, 'public') + '/' },
      { find: 'next/image', replacement: path.join(mockDir, 'NextImage.tsx') },
      { find: 'next/link', replacement: path.join(mockDir, 'NextLink.tsx') },
      { find: 'next/navigation', replacement: path.join(mockDir, 'next-navigation.ts') },
      { find: 'framer-motion', replacement: path.join(mockDir, 'framer-motion.tsx') },
      { find: '@fortawesome/react-fontawesome', replacement: path.join(mockDir, 'FontAwesome.tsx') },
    ],
  },
})
