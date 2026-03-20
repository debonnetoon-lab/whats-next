import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  server: {
    port: 3000
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'ai-consultancy': resolve(__dirname, 'src/pages/ai-consultancy.html'),
        'ai-implementatie-kmo': resolve(__dirname, 'src/pages/ai-implementatie-kmo.html'),
        'ai-implementatie': resolve(__dirname, 'src/pages/ai-implementatie.html'),
        'ai-playbooks': resolve(__dirname, 'src/pages/ai-playbooks.html'),
        'ai-roi-calculator': resolve(__dirname, 'src/pages/ai-roi-calculator.html'),
        'ai-strategie-kmo': resolve(__dirname, 'src/pages/ai-strategie-kmo.html'),
        'ai-strategie-traject': resolve(__dirname, 'src/pages/ai-strategie-traject.html'),
        'ai-strategiegesprek': resolve(__dirname, 'src/pages/ai-strategiegesprek.html'),
        'ai-tools-vergeleken': resolve(__dirname, 'src/pages/ai-tools-vergeleken.html'),
        'ai-trends-belgie': resolve(__dirname, 'src/pages/ai-trends-belgie.html'),
        'ai-voor-bouwbedrijven': resolve(__dirname, 'src/pages/ai-voor-bouwbedrijven.html'),
        'ai-wetgeving-belgie': resolve(__dirname, 'src/pages/ai-wetgeving-belgie.html'),
        'ai-workshops': resolve(__dirname, 'src/pages/ai-workshops.html'),
        'article': resolve(__dirname, 'src/pages/article.html'),
        'case-study-template': resolve(__dirname, 'src/pages/case-study-template.html'),
        'case': resolve(__dirname, 'src/pages/case.html'),
        'prompt-academy': resolve(__dirname, 'src/pages/prompt-academy.html'),
        'resources': resolve(__dirname, 'src/pages/resources.html'),
        'scan': resolve(__dirname, 'src/pages/scan.html'),
        'tool': resolve(__dirname, 'src/pages/tool.html')
      }
    }
  }
})
