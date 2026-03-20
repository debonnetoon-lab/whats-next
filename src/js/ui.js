
document.addEventListener('DOMContentLoaded', async () => {
    // --- Automated Newsroom Drafts UI ---
    const draftsContainer = document.getElementById('drafts-container');
    if (draftsContainer) {
        try {
            const res = await fetch('/src/data/news-drafts.json');
            const drafts = await res.json();
            
            draftsContainer.innerHTML = drafts.map(d => `
                <div class="bg-white p-4 rounded-lg border border-red-50 shadow-sm relative overflow-hidden">
                    <div class="absolute top-0 right-0 bg-red-500 text-white text-[8px] px-2 py-0.5 font-bold uppercase tracking-tighter">
                        ${d.confidence}% match
                    </div>
                    <h4 class="text-xs font-bold text-gray-800 pr-12">${d.title}</h4>
                    <p class="text-[10px] text-gray-400 mt-1 italic">Bronnen: ${d.sources.join(', ')}</p>
                    <div class="mt-3 flex gap-2">
                        <button class="bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded hover:bg-black transition-colors publish-btn">
                            Publish
                        </button>
                        <button class="border border-gray-200 text-gray-400 text-[10px] font-bold px-3 py-1.5 rounded hover:bg-gray-50 transition-colors">
                            Edit
                        </button>
                    </div>
                </div>
            `).join('');

            // Mock publishing logic
            draftsContainer.querySelectorAll('.publish-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const card = e.target.closest('div');
                    card.style.opacity = '0.5';
                    e.target.innerText = 'Gepubliceerd ✅';
                    e.target.disabled = true;
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 1500);
                });
            });
        } catch (e) {
            console.error('Failed to load drafts', e);
        }
    }
    // --- Sticky & Floating CTAs ---
    const injectStickyCTAs = () => {
        const ctaContainer = document.createElement('div');
        ctaContainer.className = 'fixed bottom-8 right-8 z-[100] flex flex-col gap-3 items-end animate-fade-in';
        ctaContainer.innerHTML = `
            <!-- Floating Scan CTA -->
            <a href="/src/pages/scan.html" class="group flex items-center gap-3 bg-white border border-gray-100 p-2 pr-5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300">
                <div class="w-10 h-10 bg-accent/10 text-accent rounded-full flex items-center justify-center text-lg">🧪</div>
                <span class="text-[10px] font-black uppercase tracking-widest text-text">Doe AI Scan</span>
            </a>
            
            <!-- Sticky AI Gesprek CTA -->
            <a href="/src/pages/ai-strategiegesprek.html" class="flex items-center gap-3 bg-black text-white p-2 pr-5 rounded-full shadow-2xl hover:bg-accent transition-all duration-300 hover:scale-105">
                <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-lg">📅</div>
                <span class="text-[10px] font-black uppercase tracking-widest leading-none">Plan AI<br/>gesprek</span>
            </a>
        `;
        document.body.appendChild(ctaContainer);
    };

    injectStickyCTAs();
});
