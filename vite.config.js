import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'

// The site is four plain HTML pages. List every page here so the
// build publishes all of them (by default Vite only publishes index.html).
const root = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  // Relative asset paths: works at a domain root or in a sub-folder
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        about: resolve(root, 'about.html'),
        product: resolve(root, 'product.html'),
        contact: resolve(root, 'contact.html'),
      },
    },
  },
})
