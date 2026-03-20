
import './rag-mock.js';
import './maturity-scan.js';

document.addEventListener('DOMContentLoaded', () => {
  // --- Ask Whatsnext Logic ---
  const askRoot = document.getElementById('ask-box-root');
  if (askRoot) {
    askRoot.innerHTML = `
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-inner">
        <label for="ask-input" class="block text-sm font-bold text-gray-700 uppercase tracking-wide">Ask Whatsnext AI</label>
        <p class="text-xs text-gray-500 mb-4">Vraag alles over AI voor jouw KMO</p>
        <div class="relative">
          <input id="ask-input" class="w-full p-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all shadow-sm" placeholder="Bijv. Hoe kan AI mijn facturatie versnellen?" />
          <button id="ask-submit" class="absolute right-2 top-2 bottom-2 bg-accent text-white px-4 rounded-lg hover:bg-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div id="ask-loading" class="mt-4 hidden text-sm text-gray-500 italic">Antwoord genereren...</div>
        <div id="ask-answer" class="mt-6"></div>
      </div>`;

    const input = document.getElementById('ask-input');
    const submit = document.getElementById('ask-submit');
    const answer = document.getElementById('ask-answer');
    const loading = document.getElementById('ask-loading');

    const handleAsk = async () => {
      const q = input.value.trim();
      if (!q) return;
      
      loading.classList.remove('hidden');
      answer.innerHTML = '';
      
      // Simulate network delay
      setTimeout(async () => {
        const answerHtml = await window.ragRetrieveAndAnswer(q);
        loading.classList.add('hidden');
        answer.innerHTML = answerHtml;
      }, 800);
    };

    submit.addEventListener('click', handleAsk);
    input.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleAsk(); });
  }

  // --- Dynamic Content Loading ---
  
  // Tools Grid
  const toolsGrid = document.getElementById('tools-grid');
  if (toolsGrid) {
    fetch('/src/data/tools.json')
      .then(r => r.json())
      .then(tools => {
        toolsGrid.innerHTML = tools.map(t => `
          <a href="/src/pages/tool.html?id=${t.id}" class="group p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-accent transition-all duration-300 flex flex-col h-full">
            <div class="flex justify-between items-start mb-4">
              <span class="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">${t.pricing}</span>
              <div class="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h3 class="font-bold text-lg mb-2 group-hover:text-accent transition-colors" data-acf-field="tool_name">${t.name}</h3>
            <p class="text-sm text-gray-600 flex-grow" data-acf-field="tool_description">${t.short}</p>
            <div class="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
              <span class="text-xs text-gray-400 font-medium">KMO Score</span>
              <span class="text-xs font-bold text-accent">${t.kmo_score}%</span>
            </div>
          </a>`).join('');
      });
  }

  // Article Feed
  const articleFeed = document.getElementById('article-feed');
  if (articleFeed) {
      fetch('/src/data/articles.json')
          .then(r => r.json())
          .then(articles => {
              articleFeed.innerHTML = articles.slice(0, 2).map((a, i) => `
                <article class="border border-gray-100 rounded-3xl bg-white hover:border-accent/20 transition-all duration-500 group relative overflow-hidden flex flex-col">
                  <!-- Editorial Image -->
                  <div class="w-full h-56 overflow-hidden flex-shrink-0">
                    <img src="/images/${i === 0 ? 'intelligence-editorial' : 'hero-editorial'}.png" alt="${a.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div class="p-10 flex flex-col flex-grow">
                    <div class="flex items-center gap-2 mb-8">
                      ${a.tags.map(tag => `<span class="text-[10px] font-black text-accent uppercase tracking-widest">${tag}</span>`).join('<span class="text-gray-200">•</span>')}
                    </div>
                    <h3 class="text-3xl font-black mb-6 tracking-tighter group-hover:text-accent transition-colors"><a href="/src/pages/article.html?id=${a.id}">${a.title}</a></h3>
                    <p class="text-gray-400 text-lg mb-10 leading-relaxed line-clamp-2 flex-grow">${a.summary}</p>
                    <div class="flex justify-between items-center text-[10px] text-gray-400 font-black border-t border-gray-50 pt-8 uppercase tracking-widest">
                      <span>${new Date(a.published_at).toLocaleDateString('nl-BE')}</span>
                      <a href="/src/pages/article.html?id=${a.id}" class="text-text hover:text-accent flex items-center gap-2">
                          Lees verder
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                          </svg>
                      </a>
                    </div>
                  </div>
                </article>
              `).join('');
          });
  }

  // Cases Grid
  const casesGrid = document.getElementById('cases-grid');
  if (casesGrid) {
      fetch('/src/data/cases.json')
          .then(r => r.json())
          .then(cases => {
              casesGrid.innerHTML = cases.map((c, i) => `
                <div class="border border-gray-100 rounded-3xl bg-white hover:border-accent/20 transition-all duration-500 group overflow-hidden flex flex-col">
                    <!-- Editorial Image -->
                    <div class="w-full h-52 overflow-hidden flex-shrink-0">
                      <img src="/images/${i === 0 ? 'case-editorial' : 'hero-editorial'}.png" alt="${c.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    </div>
                    <div class="p-10 flex flex-col flex-grow">
                      <span class="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-6">${c.sector}</span>
                      <h3 class="text-3xl font-black mb-6 tracking-tighter group-hover:text-accent transition-colors">${c.title}</h3>
                      <p class="text-gray-400 text-base mb-8 leading-relaxed flex-grow">${c.summary}</p>
                      <div class="bg-gray-50 p-6 rounded-2xl flex items-center justify-between">
                          <div>
                              <p class="text-[10px] font-black text-accent uppercase mb-1 tracking-widest">Vandaag</p>
                              <p class="text-sm font-black text-text">${c.metrics[0]}</p>
                          </div>
                          <div class="w-px h-8 bg-gray-200 mx-4"></div>
                          <div>
                              <p class="text-[10px] font-black text-accent uppercase mb-1 tracking-widest">Besparing</p>
                              <p class="text-sm font-black text-text">${c.metrics[1]}</p>
                          </div>
                      </div>
                    </div>
                </div>
              `).join('');
          });
  }

  // Prompts Grid
  const promptsGrid = document.getElementById('prompts-grid');
  if (promptsGrid) {
      fetch('/src/data/prompts.json')
          .then(r => r.json())
          .then(prompts => {
              promptsGrid.innerHTML = prompts.map(p => `
                <div class="p-8 border border-gray-100 rounded-3xl bg-white hover:border-accent transition-all group flex flex-col cursor-pointer" onclick="navigator.clipboard.writeText('${p.prompt.replace(/'/g, "\\'")}'); alert('Prompt gekopieerd!')">
                    <div class="flex justify-between items-center mb-6">
                        <span class="text-[10px] font-black text-accent uppercase tracking-widest">${p.category}</span>
                        <div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-accent group-hover:text-white transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                        </div>
                    </div>
                    <h3 class="text-xl font-black mb-4 tracking-tighter">${p.title}</h3>
                    <p class="text-sm text-gray-400 line-clamp-3 leading-relaxed flex-grow italic font-serif">"${p.prompt}"</p>
                    <p class="mt-6 text-[10px] font-black text-gray-200 uppercase tracking-widest">Klik om te kopiëren</p>
                </div>
              `).join('');
          });
  }

  // --- Scroll Progress Component ---
  const createProgressBar = () => {
      const bar = document.createElement('div');
      bar.className = 'fixed top-0 left-0 w-full h-1 z-50 pointer-events-none opacity-0 transition-opacity duration-300';
      bar.innerHTML = '<div id="scroll-progress" class="h-full bg-accent w-0"></div>';
      document.body.appendChild(bar);

      window.addEventListener('scroll', () => {
          const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = (winScroll / height) * 100;
          const progressLine = document.getElementById('scroll-progress');
          if (progressLine) {
              progressLine.style.width = scrolled + "%";
              bar.style.opacity = winScroll > 50 ? '1' : '0';
          }
      });
  };
  createProgressBar();
});
