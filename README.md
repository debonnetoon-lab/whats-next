# Whatsnext 2.0 Prototype

Kant-en-klare HTML/Tailwind prototype voor Whatsnext 2.0, inclusief mock AI-POC en Maturity Scan.

## 🚀 Aan de slag

1. Installeer dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Bekijk op: `http://localhost:3000`

## 📂 Projectstructuur
- `/src/pages`: Homepage en specifieke pagina's (index.html, scan.html, etc.)
- `/src/components`: Reusable HTML partials voor WP conversion.
- `/src/js`: Mock AI logica (RAG, Maturity Scan) en UI handling.
- `/src/data`: JSON fixtures voor content, tools en cases.

## 🤖 AI Logic (Mocked)
- **RAG Mock**: Keyword-scoring op `articles.json` via `rag-mock.js`.
- **Maturity Scan**: Deterministic scoring met persistence in `localStorage`.
- **Automated Newsroom**: Drafts UI op de Scan en Article pagina's.

## 🛠 WordPress Conversie Mapping

### ACF Velden
- **Article**: `hero_title`, `hero_tl_dr` (textarea), `article_content` (WYSWIYG), `article_sources` (repeater).
- **Tool**: `tool_name`, `tool_score`, `pricing_notes`, `use_cases` (repeater).
- **Scan Result**: `scan_result_label`, `scan_advice`.

### Template Mapping
Behoud alle `data-acf-field` attributen. Vervang `fetch()` calls in `app.js` en `maturity-scan.js` door WP REST API endpoints of gelokaliseerde PHP data objecten.

## ✅ Acceptatiecriteria
- [x] `npm run dev` werkt zonder fouten.
- [x] Ask Whatsnext (RAG) geeft antwoord met bronvermelding.
- [x] Maturity Scan berekent score en biedt export (.txt).
- [x] Lighthouse Performance >= 90 (getest op homepage).
