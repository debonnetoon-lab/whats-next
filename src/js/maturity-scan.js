
const maturityQuestions = [
    {
        q: "Hoeveel ervaring heeft je team momenteel met AI-tools (ChatGPT, Claude, Midjourney)?",
        options: ["Geen ervaring", "Beperkt (incidenteel gebruik)", "Dagelijks gebruik in workflows", "Strategisch geïmplementeerd"],
        weights: [0, 10, 25, 33.3]
    },
    {
        q: "Is er binnen je bedrijf een budget of tijd gereserveerd voor AI-experimenten?",
        options: ["Nee", "We denken erover na", "Ja, beperkt budget", "Ja, vast onderdeel van strategie"],
        weights: [0, 8, 20, 33.3]
    },
    {
        q: "In welke mate is je interne data (klantgegevens, documentatie) digitaal ontsloten?",
        options: ["Alles op papier of verspreid", "Deels digitaal, niet gecentraliseerd", "Grotendeels digitaal in cloud", "Volledig ontsloten via API/SaaS"],
        weights: [0, 12, 24, 33.4]
    }
];

const maturityLevels = [
    { range: [0, 33], label: "Beginner", advice: "Start met het automatiseren van eenvoudige tekst-gebaseerde taken. Focus op training van personeel in prompt-engineering.", tool: "ChatGPT (Plus)", step: "Audit je huidige administratieve processen.", kpi: "Besparingen in tijd per werknemer." },
    { range: [34, 66], label: "Intermediate", advice: "Koppel je data aan AI-modellen via Custom GPT's of gespecialiseerde tools. Focus op datastructuur.", tool: "Claude 3.5 Sonnet", step: "Maak een 'AI Playbook' voor je team.", kpi: "Verhoging van output-kwaliteit." },
    { range: [67, 100], label: "Advanced", advice: "Bouw eigen RAG-systemen of implementeer AI agents voor complexe procesbeheersing. Strategische voorsprong.", tool: "OpenAI API / Azure AI", step: "Implementeer een AI-governance beleid.", kpi: "Directe omzetgroei door nieuwe AI-diensten." }
];

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('maturity-scan-root');
    if (!root) return;

    let currentStep = -1; // -1 = Lead Info, 0-N = Questions, N+1 = Email Capture
    let scores = [];
    let leadInfo = {};

    const render = () => {
        if (currentStep === -1) {
            // Step 0: Lead Info
            root.innerHTML = `
                <div class="animate-fade-in">
                    <h3 class="text-2xl font-black mb-2 tracking-tighter">Start je AI Maturity Scan</h3>
                    <p class="text-gray-400 text-sm mb-8">Vul je bedrijfsgegevens in om een gepersonaliseerd rapport te ontvangen.</p>
                    
                    <form id="scan-lead-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Bedrijfsnaam</label>
                                <input type="text" name="company" required placeholder="Jouw Bedrijf" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent/20">
                            </div>
                            <div>
                                <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Sector</label>
                                <select name="sector" required class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent/20">
                                    <option value="Bouw">Bouw</option>
                                    <option value="Retail">Retail</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Accountancy">Accountancy</option>
                                    <option value="Anders">Anders</option>
                                </select>
                            </div>
                        </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Aantal werknemers</label>
                                <select name="employees" required class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent/20">
                                    <option value="1-10">1-10 medewerkers</option>
                                    <option value="11-50">11-50 medewerkers</option>
                                    <option value="51-250">51-250 medewerkers</option>
                                    <option value="250+">250+ medewerkers</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">E-mailadres</label>
                                <input type="email" name="email" required placeholder="naam@bedrijf.be" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent/20">
                            </div>
                        </div>
                        <div>
                            <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Grootste AI Uitdaging</label>
                            <textarea name="challenge" rows="2" placeholder="Wat wil je verbeteren met AI?" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent/20 resize-none"></textarea>
                        </div>
                        <button type="submit" class="w-full py-4 bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-accent transition-all">
                            Start de Scan →
                        </button>
                    </form>
                </div>
            `;
            root.querySelector('#scan-lead-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                leadInfo = Object.fromEntries(formData.entries());
                currentStep = 0;
                render();
            });
        } else if (currentStep < maturityQuestions.length) {
            const q = maturityQuestions[currentStep];
            root.innerHTML = `
                <div class="animate-fade-in">
                    <div class="flex justify-between items-center mb-6">
                        <span class="text-[10px] font-bold text-accent uppercase tracking-widest">Questions ${currentStep + 1} of ${maturityQuestions.length}</span>
                        <div class="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div class="h-full bg-accent transition-all duration-500" style="width: ${((currentStep + 1) / maturityQuestions.length) * 100}%"></div>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold mb-8 text-text">${q.q}</h3>
                    <div class="space-y-3">
                        ${q.options.map((opt, i) => `
                            <button class="w-full text-left p-4 border border-gray-100 rounded-xl hover:border-accent hover:bg-red-50/30 transition-all font-medium text-sm option-btn" data-index="${i}">
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;

            root.querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.dataset.index);
                    scores.push(q.weights[idx]);
                    currentStep++;
                    render();
                });
            });
        } else {
            const totalScore = Math.min(100, Math.round(scores.reduce((a, b) => a + b, 0)));
            const level = maturityLevels.find(l => totalScore >= l.range[0] && totalScore <= l.range[1]);
            
            root.innerHTML = `
                <div class="animate-fade-in py-4">
                    <div class="flex flex-col items-center text-center mb-8">
                        <div class="w-24 h-24 rounded-full border-8 border-accent/20 flex items-center justify-center mb-4">
                            <span class="text-3xl font-black text-accent">${totalScore}%</span>
                        </div>
                        <h3 class="text-2xl font-black tracking-tight">Level: ${level.label}</h3>
                    </div>
                    
                    <!-- Result Summary -->
                    <div id="scan-results-content" class="space-y-6">
                        <div class="p-4 border border-gray-50 rounded-lg bg-gray-50/30">
                            <p class="text-sm text-gray-600 leading-relaxed">${level.advice}</p>
                        </div>
                    </div>
                    <div id="final-actions" class="mt-10 pt-6 border-t border-gray-100 flex flex-col gap-3">
                        <a href="/src/pages/ai-strategiegesprek.html" class="w-full bg-accent text-white font-black py-4 rounded-xl hover:bg-black transition-all text-center uppercase tracking-widest text-sm shadow-lg shadow-red-100">
                            Boek nu je AI Strategiegesprek
                        </a>
                        <button onclick="window.location.reload()" class="text-xs text-gray-400 hover:text-accent font-bold mt-2 underline">
                            Opnieuw scannen
                        </button>
                    </div>
                </div>
div>
            `;

            // Auto-submit to backend
            fetch('http://localhost:3005/api/scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    company: leadInfo.company,
                    sector: leadInfo.sector,
                    employees: leadInfo.employees,
                    email: leadInfo.email,
                    biggest_problem: leadInfo.challenge,
                    ai_usage_level: scores[0] > 20 ? 'advanced' : 'basic', // Rough mapping
                    automation_interest: 'high'
                })
            }).catch(err => console.error('Scan persist error:', err));

            // Persist (basic)
            localStorage.setItem('whatsnext_scan', JSON.stringify({ ...leadInfo, score: totalScore, level: level.label }));
        }
    };

    render();
});
