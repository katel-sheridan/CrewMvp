import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({ 
  base: '/CrewMvp/',
  plugins: [
    {
      name: 'figma-asset-placeholder',
      resolveId(source) {
        if (source.startsWith('figma:asset/')) return source
        return null
      },
      load(id) {
        if (!id.startsWith('figma:asset/')) return null

        // 1x1 transparent PNG. Figma Make exports sometimes reference assets
        // via the `figma:asset/*` scheme; in a standalone Vite app we map
        // them to a harmless placeholder so the dev server can run.
        const transparentPngDataUrl =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO9lGZkAAAAASUVORK5CYII='

        return `export default ${JSON.stringify(transparentPngDataUrl)};`
      },
    },
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
