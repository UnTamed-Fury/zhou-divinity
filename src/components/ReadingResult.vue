<script setup lang="ts">
import type { Reading } from '../logic/types';
import TrigramDisplay from './TrigramDisplay.vue';

defineProps<{
  reading: Reading;
}>();
</script>

<template>
  <div class="reading-result-container">
    <!-- Header -->
    <header class="reading-header reveal">
      <div class="hex-badge">Oracle {{ reading.presentHexagram.hex }}</div>
      <h1 class="chinese-main">{{ reading.presentHexagram.trad_chinese }}</h1>
      <h2 class="english-subtitle">{{ reading.presentHexagram.english }}</h2>
      <p class="pinyin-label">{{ reading.presentHexagram.pinyin }}</p>
    </header>

    <!-- Trigrams Editorial -->
    <div class="trigrams-wrap reveal">
      <div class="trigram-card">
        <TrigramDisplay v-bind="reading.presentHexagram.wilhelm_above" name="Above" :is-upper="true" />
      </div>
      <div class="trigram-card">
        <TrigramDisplay v-bind="reading.presentHexagram.wilhelm_below" name="Below" :is-upper="false" />
      </div>
    </div>

    <!-- Main Commentary -->
    <div class="editorial-body">
      <section class="chapter reveal card">
        <div class="chapter-meta">I</div>
        <h3 class="chapter-title">The Judgment</h3>
        <p class="judgment-text">{{ reading.presentHexagram.wilhelm_judgment.text }}</p>
        <div class="commentary-text">
          {{ reading.presentHexagram.wilhelm_judgment.comments }}
        </div>
      </section>

      <section class="chapter reveal card">
        <div class="chapter-meta">II</div>
        <h3 class="chapter-title">The Image</h3>
        <p class="image-quote">{{ reading.presentHexagram.wilhelm_image.text }}</p>
        <div class="commentary-text">
          {{ reading.presentHexagram.wilhelm_image.comments }}
        </div>
      </section>

      <!-- Changing Lines -->
      <section v-if="reading.changingLines.length > 0" class="chapter changing-section reveal card">
        <div class="chapter-meta cinnabar">III</div>
        <h3 class="chapter-title cinnabar">The Shifting Lines</h3>
        <div class="lines-list">
          <div v-for="lineIdx in reading.changingLines" :key="lineIdx" class="line-item">
            <span class="line-label">Line {{ lineIdx }}</span>
            <p class="line-content">{{ reading.presentHexagram.wilhelm_lines?.[lineIdx.toString()]?.text }}</p>
            <div class="line-commentary">
              {{ reading.presentHexagram.wilhelm_lines?.[lineIdx.toString()]?.comments }}
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Future Connector -->
    <div v-if="reading.futureHexagram" class="future-flow reveal">
      <div class="connector-visual">
        <svg viewBox="0 0 100 100" class="connector-svg">
          <line x1="50" y1="0" x2="50" y2="100" stroke="var(--gold)" stroke-width="1" stroke-dasharray="4 4" />
          <circle cx="50" cy="50" r="4" fill="var(--gold)" />
        </svg>
        <span class="connector-label">Transmuting Into</span>
      </div>
      
      <div class="future-card card">
        <header class="f-header">
          <span class="f-badge">Relating Hexagram {{ reading.futureHexagram.hex }}</span>
          <h3>{{ reading.futureHexagram.trad_chinese }} &mdash; {{ reading.futureHexagram.english }}</h3>
        </header>
        <p class="f-judgment">{{ reading.futureHexagram.wilhelm_judgment.text }}</p>
        <div class="f-commentary">
          {{ reading.futureHexagram.wilhelm_judgment.comments }}
        </div>
      </div>
    </div>

    <!-- Reflection Panel -->
    <section class="reflection-panel reveal card">
      <h3 class="reflect-title">The Mirror of Changes</h3>
      <p class="reflect-intro">The I Ching is a resonance between your query and the cosmic law. Contemplate these facets of your situation:</p>
      
      <div class="reflect-grid">
        <div class="reflect-point">
          <span class="point-num">01</span>
          <h4>The Core Theme</h4>
          <p>How does the essence of "{{ reading.presentHexagram.english }}" manifest in your current environment?</p>
        </div>
        <div class="reflect-point">
          <span class="point-num">02</span>
          <h4>The Movement</h4>
          <p v-if="reading.changingLines.length > 0">A transition is underway. Are you acting in accordance with the direction of this change?</p>
          <p v-else>The situation is in a state of consolidation. How can you strengthen your internal alignment?</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.reading-result-container {
  max-width: 900px;
  margin: var(--space-xl) auto;
}

/* Header */
.reading-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.hex-badge {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: var(--gold);
  margin-bottom: var(--space-sm);
  font-weight: 700;
}

.chinese-main {
  font-size: clamp(4rem, 3rem + 5vw, 8rem);
  margin-bottom: var(--space-xs);
}

.english-subtitle {
  font-size: 2rem;
  font-style: italic;
  font-weight: 400;
  color: var(--slate);
  margin-bottom: var(--space-xs);
}

.pinyin-label {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.75rem;
  color: #888;
}

/* Trigrams Wrap */
.trigrams-wrap {
  display: flex;
  justify-content: center;
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: var(--space-lg) 0;
}

/* Editorial Body */
.editorial-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.chapter {
  position: relative;
  overflow: visible;
}

.chapter-meta {
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
  font-family: var(--font-heading);
  color: rgba(184, 134, 11, 0.15);
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
}

.chapter-meta.cinnabar { color: rgba(150, 45, 45, 0.1); }

.chapter-title {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.75rem;
  color: var(--gold);
  margin-bottom: var(--space-lg);
}

.chapter-title.cinnabar { color: var(--cinnabar); }

.judgment-text, .image-quote {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: var(--space-md);
  color: var(--ink);
}

.image-quote { font-style: italic; }

.commentary-text {
  color: var(--slate);
  font-size: 1.05rem;
  white-space: pre-line;
}

/* Lines List */
.lines-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.line-item {
  padding-left: var(--space-md);
  border-left: 1px solid var(--cinnabar);
}

.line-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--cinnabar);
  font-weight: 700;
  display: block;
  margin-bottom: var(--space-xs);
}

.line-content {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: var(--space-sm);
}

.line-commentary {
  font-size: 0.95rem;
  color: var(--slate);
  line-height: 1.6;
}

/* Future Flow */
.future-flow {
  margin: var(--space-xl) 0;
}

.connector-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--space-lg);
}

.connector-svg {
  width: 40px;
  height: 80px;
}

.connector-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--gold);
  font-weight: 700;
  margin-top: var(--space-xs);
}

.f-header {
  margin-bottom: var(--space-md);
}

.f-badge {
  font-size: 0.65rem;
  text-transform: uppercase;
  color: var(--gold);
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: var(--space-xs);
}

.f-judgment {
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: var(--space-sm);
}

.f-commentary {
  font-size: 1rem;
  color: var(--slate);
  line-height: 1.6;
}

/* Reflection Panel */
.reflection-panel {
  background: var(--ink);
  color: var(--white);
  border: none;
}

.reflect-title {
  color: var(--gold);
  font-style: italic;
  font-size: 2.2rem;
  margin-bottom: var(--space-md);
}

.reflect-intro {
  color: rgba(255,255,255,0.7);
  margin-bottom: var(--space-lg);
}

.reflect-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  margin-top: var(--space-lg);
  text-align: left;
}

.point-num {
  font-size: 0.7rem;
  color: var(--gold);
  font-weight: 700;
  display: block;
  margin-bottom: var(--space-xs);
}

.reflect-point h4 {
  color: var(--white);
  font-size: 1rem;
  margin-bottom: var(--space-xs);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.reflect-point p {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .trigrams-wrap { flex-direction: column; gap: var(--space-md); }
  .reflect-grid { grid-template-columns: 1fr; }
}
</style>
