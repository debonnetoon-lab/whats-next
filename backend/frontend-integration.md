# Whatsnext Backend - Frontend Integration Guide

This guide provides examples of how to connect the existing frontend to the new backend API.

## Base URL
Ensure your frontend knows where the API is running (e.g., `http://localhost:3000`).

## 1. Submitting a Lead
Use this for contact forms or newsletter signups.

```javascript
const submitLead = async (data) => {
  const response = await fetch("http://localhost:3000/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Jan De Man",
      email: "jan@example.be",
      company: "Jan Corp",
      message: "Ik wil meer info over AI workshops.",
      lead_source: "contact_page"
    })
  });
  return await response.json();
};
```

## 2. Running the AI Maturity Scan
Call this when the user finishes the scan questions.

```javascript
const runScan = async (scanData) => {
  const response = await fetch("http://localhost:3000/api/scan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(scanData)
  });
  return await response.json(); // Returns { score, level, recommendations }
};
```

## 3. Ask Whatsnext AI (Homepage Chat)
Power the AI advisor box.

```javascript
const askAI = async (question) => {
  const response = await fetch("http://localhost:3000/api/ai-advisor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });
  return await response.json(); // Returns { answer, next_step }
};
```

## 4. Loading Dynamic Content (CMS)
Replace static HTML grids with data from the API.

```javascript
const loadArticles = async () => {
  const response = await fetch("http://localhost:3000/api/articles");
  const articles = await response.json();
  
  const container = document.getElementById('article-feed');
  container.innerHTML = articles.map(article => `
    <div class="article-card">
      <h3>${article.title}</h3>
      <p>${article.excerpt}</p>
    </div>
  `).join('');
};
```

## Security Note
Remember to configure **CORS** in `backend/server/index.js` to allow your frontend domain once deployed.
