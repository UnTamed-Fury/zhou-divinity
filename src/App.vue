<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { LineValue, Reading, HexagramData } from './logic/types';
import { coinToss, yarrowStalk, linesToBinary, getFutureBinary, getChangingLines } from './logic/divination';
// @ts-ignore
import hexagramsData from './assets/hexagrams.js';
import HomePage from './components/HomePage.vue';
import NotFound from './components/NotFound.vue';
import HexagramDisplay from './components/HexagramDisplay.vue';
import ReadingResult from './components/ReadingResult.vue';
import MethodSelector from './components/MethodSelector.vue';
import AdSpace from './components/AdSpace.vue';
import './assets/styles/global.css';

type ViewState = 'home' | 'divination' | 'history' | '404';
const currentView = ref<ViewState>('home');
const currentReading = ref<Reading | null>(null);
const isGenerating = ref(false);
const history = ref<Reading[]>([]);

const hexMap = new Map<string, HexagramData>();
Object.values(hexagramsData as Record<string, HexagramData>).forEach(h => {
  let bin = h.binary.toString();
  while (bin.length < 6) bin = '0' + bin;
  hexMap.set(bin, h);
});

function generateReading(method: 'coin' | 'yarrow') {
  isGenerating.value = true;
  currentReading.value = null;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  setTimeout(() => {
    const lines: LineValue[] = [];
    for (let i = 0; i < 6; i++) {
      lines.push(method === 'coin' ? coinToss() : yarrowStalk());
    }

    const presentBin = linesToBinary(lines);
    const futureBin = getFutureBinary(lines);
    const presentHexagram = hexMap.get(presentBin);
    if (!presentHexagram) {
      currentView.value = '404';
      isGenerating.value = false;
      return;
    }

    const reading: Reading = {
      originalLines: lines,
      presentHexagram,
      futureHexagram: futureBin ? hexMap.get(futureBin) : undefined,
      changingLines: getChangingLines(lines)
    };

    currentReading.value = reading;
    history.value.unshift(reading);
    if (history.value.length > 10) history.value.pop();
    localStorage.setItem('i-ching-history', JSON.stringify(history.value));
    isGenerating.value = false;
  }, 1500);
}

function resetReading() {
  currentReading.value = null;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  const saved = localStorage.getItem('i-ching-history');
  if (saved) {
    try {
      history.value = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse history');
    }
  }
});
</script>

<template>
  <div class="app-root">
    <div class="ink-wash"></div>
    
    <!-- Sticky Navigation -->
    <header class="main-header">
      <div class="header-container">
        <div class="logo" @click="currentView = 'home'; currentReading = null">
          <span class="logo-icon">☯</span>
          <span class="logo-text">Zhou Divinity</span>
        </div>
        <nav class="nav-links">
          <button :class="{ active: currentView === 'home' }" @click="currentView = 'home'">Home</button>
          <button :class="{ active: currentView === 'divination' }" @click="currentView = 'divination'; currentReading = null">Oracle</button>
          <button :class="{ active: currentView === 'history' }" @click="currentView = 'history'">History</button>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <transition name="fade" mode="out-in">
        <div :key="currentView + (currentReading ? 'r' : 'v')">
          
          <HomePage v-if="currentView === 'home'" @start="currentView = 'divination'" @view-history="currentView = 'history'" />

          <div v-else-if="currentView === 'divination'" class="divination-container">
            <div v-if="!currentReading && !isGenerating" class="setup-mode">
              <MethodSelector @select="generateReading" />
            </div>

            <div v-if="isGenerating" class="loading-overlay">
              <div class="ink-drop"></div>
              <p class="loading-label">The cosmos is in flux...</p>
            </div>

            <div v-if="currentReading" class="reading-presentation">
              <div class="visual-editorial-hero reveal card">
                <div class="hero-hex-grid">
                  <HexagramDisplay :lines="currentReading.originalLines" title="The Present Moment" />
                  <div v-if="currentReading.futureHexagram" class="change-bridge">
                    <span class="bridge-label">Movement</span>
                    <div class="bridge-line"></div>
                  </div>
                  <HexagramDisplay 
                    v-if="currentReading.futureHexagram" 
                    :lines="currentReading.originalLines.map(v => (v === 6 ? 7 : (v === 9 ? 8 : v)))" 
                    title="The Future Path"
                    :is-future="true"
                  />
                </div>
              </div>

              <ReadingResult :reading="currentReading" />

              <div class="view-actions">
                <button class="outline" @click="resetReading">Consult Once More</button>
              </div>
            </div>
          </div>

          <div v-else-if="currentView === 'history'" class="history-container">
            <header class="view-header">
              <h1>Record of Changes</h1>
              <p>Recall the insights granted by the heavens.</p>
            </header>
            
            <div v-if="history.length === 0" class="empty-history card">
              <p>No previous consultations found. The ink has yet to be spilled.</p>
              <button @click="currentView = 'divination'">Consult the Oracle</button>
            </div>

            <div v-else class="history-grid">
              <div v-for="(h, idx) in history" :key="idx" class="history-card card" @click="currentReading = h; currentView = 'divination'">
                <div class="card-meta">#{{ h.presentHexagram.hex }}</div>
                <h3>{{ h.presentHexagram.trad_chinese }} &mdash; {{ h.presentHexagram.english }}</h3>
                <div class="card-link">Review Reflection →</div>
              </div>
            </div>
          </div>

          <NotFound v-else-if="currentView === '404'" @home="currentView = 'home'" />

        </div>
      </transition>
    </main>

    <AdSpace slot-id="footer-top" />

    <footer class="site-footer">
      <div class="footer-layout">
        <div class="footer-brand">
          <h3>Zhou Divinity</h3>
          <p>A digital vessel for ancient wisdom, following the Wilhelm-Baynes translation.</p>
        </div>
        <div class="footer-nav">
          <div class="footer-col">
            <span class="col-title">Navigation</span>
            <a @click="currentView = 'home'">Home</a>
            <a @click="currentView = 'divination'">Oracle</a>
            <a @click="currentView = 'history'">History</a>
          </div>
          <div class="footer-col">
            <span class="col-title">Resources</span>
            <a href="https://en.wikipedia.org/wiki/I_Ching" target="_blank">Wikipedia</a>
            <a href="https://www.untamedfury.space" target="_blank">Untamed Fury</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Crafted with Intent. No fixed future, only constant change.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.main-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(244, 241, 234, 0.85);
  backdrop-filter: blur(12px) sepia(0.1);
  border-bottom: 1px solid var(--border);
}

.header-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space-sm) var(--space-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  cursor: pointer;
}

.logo-icon {
  font-size: 1.5rem;
  color: var(--cinnabar);
}

.logo-text {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: -0.01em;
}

.nav-links {
  display: flex;
  gap: var(--space-md);
}

.nav-links button {
  background: transparent;
  color: var(--slate);
  padding: 0.5rem 0;
  min-height: auto;
  font-size: 0.8rem;
}

.nav-links button.active {
  color: var(--cinnabar);
  box-shadow: inset 0 -2px 0 var(--cinnabar);
}

.nav-links button:hover {
  transform: none;
  box-shadow: none;
  color: var(--ink);
}

/* Content */
.main-content {
  flex: 1;
}

.divination-container {
  padding-top: var(--space-lg);
}

.loading-overlay {
  text-align: center;
  padding: var(--space-xl) 0;
}

.ink-drop {
  width: 60px;
  height: 60px;
  background: var(--ink);
  mask: url('https://www.svgrepo.com/show/339243/ink-stain.svg') no-repeat center;
  mask-size: contain;
  margin: 0 auto var(--space-md);
  animation: inkFlow 2.5s infinite ease-in-out;
}

@keyframes inkFlow {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.2); opacity: 0.3; }
}

.visual-editorial-hero {
  margin-bottom: var(--space-xl);
}

.hero-hex-grid {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-xl);
  padding: var(--space-lg) 0;
}

.change-bridge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.bridge-label {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--gold);
  font-weight: 700;
}

.bridge-line {
  width: 1px;
  height: 120px;
  background: linear-gradient(to bottom, var(--gold), transparent);
}

.view-actions {
  display: flex;
  justify-content: center;
  margin-top: var(--space-xl);
}

/* History */
.view-header {
  text-align: center;
  margin: var(--space-xl) 0;
}

.view-header p {
  color: var(--slate);
  font-style: italic;
  margin: 0 auto;
}

.history-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-md);
}

.history-card {
  cursor: pointer;
  padding: var(--space-lg);
  text-align: center;
}

.history-card:hover {
  transform: translateY(-5px);
  border-color: var(--cinnabar);
}

.card-meta {
  font-size: 0.65rem;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: var(--space-xs);
}

.card-link {
  margin-top: var(--space-md);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--cinnabar);
}

/* Footer */
.site-footer {
  background: var(--ink);
  color: rgba(255,255,255,0.8);
  padding: var(--space-xl) var(--space-md);
  margin-top: var(--space-xl);
}

.footer-layout {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: var(--space-xl);
}

.footer-brand h3 {
  color: var(--white);
  margin-bottom: var(--space-sm);
}

.footer-brand p {
  color: rgba(255,255,255,0.5);
  font-size: 0.95rem;
}

.footer-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
}

.col-title {
  display: block;
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: var(--space-md);
  font-weight: 700;
  letter-spacing: 0.1em;
}

.footer-col a {
  display: block;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: var(--space-xs);
  cursor: pointer;
  transition: color 0.3s;
}

.footer-col a:hover {
  color: var(--gold);
}

.footer-bottom {
  max-width: var(--max-width);
  margin: var(--space-xl) auto 0;
  padding-top: var(--space-md);
  border-top: 1px solid rgba(255,255,255,0.1);
  font-size: 0.75rem;
  text-align: center;
  opacity: 0.4;
}

@media (max-width: 900px) {
  .header-container { flex-direction: column; gap: var(--space-md); padding: var(--space-md); }
  .nav-links { gap: var(--space-sm); width: 100%; justify-content: center; border-top: 1px solid var(--border); padding-top: var(--space-sm); }
  .footer-layout { grid-template-columns: 1fr; gap: var(--space-lg); }
  .hero-hex-grid { flex-direction: column; padding: var(--space-md) 0; }
  .bridge-line { height: 40px; }
}
</style>
