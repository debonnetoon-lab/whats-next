
// Simple RAG mock: loads articles and does token overlap scoring
export const ragRetrieveAndAnswer = async function(query) {
  const res = await fetch('/src/data/articles.json');
  const articles = await res.json();

  function scoreQuery(q, article) {
    const qTokens = q.toLowerCase().split(/\s+/).filter(Boolean);
    const text = (article.title + ' ' + (article.content || '') + ' ' + (article.summary || '')).toLowerCase();
    let score = 0;
    qTokens.forEach(t => { 
        if (text.includes(t)) {
            score += 1;
            // Bonus for title matches
            if (article.title.toLowerCase().includes(t)) score += 2;
        }
    });
    return score;
  }

  const scored = articles.map(a => ({a, score: scoreQuery(query, a)}))
                         .filter(x => x.score > 0)
                         .sort((x,y)=>y.score-x.score)
                         .slice(0,3)
                         .map(x=>x.a);

  if (scored.length === 0) {
      return `
        <div class="p-3 border-l-4 border-accent bg-white">
          <p class="font-medium">Geen direct antwoord gevonden.</p>
          <p class="mt-2 text-sm">Probeer andere zoektermen zoals "facturatie", "bouw" of "HR".</p>
        </div>`;
  }

  // Build answer
  const synthesized = scored.map(s => s.summary).slice(0,2).join(' Ook ');
  const provenance = scored.map(s => `<li><a href="/src/pages/article.html?id=${s.id}" class="text-accent hover:underline">${s.title}</a></li>`).join('');
  
  const answerHtml = `
    <div class="p-3 border-l-4 border-accent bg-white shadow-sm rounded-r-lg">
      <p class="font-medium text-sm text-gray-500 uppercase tracking-wider">AI Antwoord</p>
      <p class="mt-2 text-text">${synthesized}</p>
      <div class="mt-4 pt-3 border-t border-gray-100">
        <p class="text-xs font-semibold text-gray-400 uppercase">Bronnen:</p>
        <ul class="mt-2 text-sm space-y-1">
          ${provenance}
        </ul>
      </div>
    </div>`;
  return answerHtml;
}

window.ragRetrieveAndAnswer = ragRetrieveAndAnswer;
