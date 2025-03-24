import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import createSvgSpritePlugin from 'vite-plugin-svg-spriter';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgSpritePlugin({
      svgFolder: path.resolve(__dirname, 'src/shared/assets/images/svg'),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/app/styles/variables.scss" as *;
          @use "@/app/styles/mixins.scss" as *;
        `,
      },
    },
  },
  build: {
    minify: true,
  },
});
