<script setup lang="ts">
import { onMounted } from 'vue';
import AdSpace from './AdSpace.vue';

defineEmits<{
  (e: 'start'): void;
  (e: 'viewHistory'): void;
}>();

const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-active');
    }
  });
}, observerOptions);

onMounted(() => {
  const elements = document.querySelectorAll('.reveal');
  elements.forEach(el => observer.observe(el));
});
</script>

<template>
  <div class="landing-page">
    <!-- Hero Section with Dynamic Viewport -->
    <section class="hero-section">
      <div class="hero-media">
        <img 
          src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=2400" 
          class="hero-image" 
          alt="Misty Mountains" 
        />
        <div class="hero-vignette"></div>
      </div>
      
      <div class="hero-content">
        <div class="hero-inner">
          <span class="top-label reveal">The Ancient Record of Changes</span>
          <h1 class="reveal">The Zhou Divinity</h1>
          <p class="reveal">An exploration of the 3,000-year-old philosophical system that maps the ebb and flow of existence.</p>
          <div class="cta reveal">
            <button @click="$emit('start')">Enter the Dialogue</button>
          </div>
        </div>
      </div>
      
      <div class="scroll-indicator">
        <div class="mouse"></div>
      </div>
    </section>

    <AdSpace slot-id="homepage-top" />

    <div class="content-body">
      <!-- Story Section -->
      <section class="story reveal card">
        <div class="story-grid">
          <div class="story-text">
            <h2>A Dialogue Across Time</h2>
            <p>The I Ching (Zhouyi) is more than an artifact of antiquity; it is a profound philosophical map of the world. It provides a framework for understanding the moment of flux—the point where one state being transforms into the next.</p>
            <p>Through the meditative <strong>Yarrow Stalk</strong> method or the direct <strong>Three-Coin</strong> technique, one approaches the oracle as a mirror to the inner self, revealing the quiet momentum of the present moment.</p>
            <div class="links">
              <button class="outline mini" @click="$emit('viewHistory')">Record of Changes</button>
              <a href="https://en.wikipedia.org/wiki/I_Ching" target="_blank" class="text-link">Scholarly Overview &rarr;</a>
            </div>
          </div>
          <div class="story-symbol">
            <div class="symbol-circle">
              <span>乾</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Values/Guide Grid -->
      <section class="values-grid">
        <div class="value-item card reveal">
          <div class="val-idx">I</div>
          <h4>Harmony</h4>
          <p>Finding the balance between the firm and the yielding, aligned with the Dao.</p>
        </div>
        <div class="value-item card reveal">
          <div class="val-idx">II</div>
          <h4>Clarity</h4>
          <p>Transcending the noise of the ego to witness the pure resonance of truth.</p>
        </div>
        <div class="value-item card reveal">
          <div class="val-idx">III</div>
          <h4>Transformation</h4>
          <p>Embracing the inevitable flow of change as the only constant in existence.</p>
        </div>
      </section>
      
      <section class="final-cta reveal card">
        <h3>Observation of Changes</h3>
        <p>Quiet the mind, formulate your inquiry with sincerity, and witness the shifting lines of the universal pattern.</p>
        <button @click="$emit('start')">Consult the Records</button>
      </section>
    </div>
  </div>
</template>

<style scoped>
.landing-page {
  width: 100%;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 100dvh;
  margin: 0 calc(-1 * var(--space-md));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-media {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.5) contrast(1.1);
  transform: scale(1.05);
}

.hero-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 20%, rgba(26, 26, 27, 0.4) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: var(--space-lg);
  color: var(--white);
  width: 100%;
}

.hero-inner {
  max-width: 800px;
  margin: 0 auto;
}

.top-label {
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.5em;
  font-size: 0.8rem;
  margin-bottom: var(--space-md);
  color: var(--gold);
  font-weight: 700;
}

.hero-inner h1 {
  color: var(--white);
  margin-bottom: var(--space-md);
  font-style: italic;
  text-shadow: 0 10px 40px rgba(0,0,0,0.3);
}

.hero-inner p {
  font-size: 1.25rem;
  margin: 0 auto var(--space-lg);
  opacity: 0.9;
  max-width: 50ch;
  color: var(--white);
}

.hero-inner button {
  background: var(--white);
  color: var(--ink);
  padding: 1.2rem 3rem;
}

.hero-inner button:hover {
  background: var(--cinnabar);
  color: var(--white);
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: var(--space-lg);
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  opacity: 0.6;
}

.mouse {
  width: 20px;
  height: 35px;
  border: 2px solid var(--white);
  border-radius: 20px;
  position: relative;
}

.mouse::after {
  content: "";
  width: 2px;
  height: 6px;
  background: var(--white);
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll 2s infinite;
}

@keyframes scroll {
  0% { opacity: 1; transform: translateX(-50%) translateY(0); }
  100% { opacity: 0; transform: translateX(-50%) translateY(10px); }
}

/* Content Body */
.content-body {
  margin-top: calc(-1 * var(--space-xl));
  position: relative;
  z-index: 10;
}

.story-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: var(--space-lg);
  align-items: center;
}

.story-text {
  padding-right: var(--space-md);
}

.story-text h2 {
  margin-bottom: var(--space-md);
  letter-spacing: -0.01em;
}

.links {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-top: var(--space-lg);
}

.text-link {
  color: var(--cinnabar);
  font-family: var(--font-heading);
  text-decoration: none;
  font-weight: 700;
  border-bottom: 1px solid transparent;
  transition: border 0.3s;
}

.text-link:hover {
  border-bottom-color: var(--cinnabar);
}

.story-symbol {
  display: flex;
  justify-content: center;
}

.symbol-circle {
  width: 200px;
  height: 200px;
  border: 1px solid var(--border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8rem;
  color: rgba(184, 134, 11, 0.1);
  background: radial-gradient(circle, rgba(184, 134, 11, 0.05) 0%, transparent 70%);
}

/* Values Grid */
.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.value-item {
  text-align: center;
}

.val-idx {
  font-family: var(--font-heading);
  color: var(--gold);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  margin-bottom: var(--space-sm);
}

.value-item h4 {
  margin-bottom: var(--space-sm);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.9rem;
}

.final-cta {
  text-align: center;
  background: var(--ink);
  color: var(--white);
  border: none;
}

.final-cta h3 {
  color: var(--gold);
  margin-bottom: var(--space-sm);
  font-style: italic;
  font-size: 2.5rem;
}

.final-cta p {
  color: rgba(255,255,255,0.7);
  margin: 0 auto var(--space-lg);
}

.final-cta button {
  background: var(--white);
  color: var(--ink);
}

/* Scroll Reveal Classes */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.2, 0, 0.2, 1);
}

.reveal-active {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 900px) {
  .hero-inner h1 { font-size: 3rem; }
  .story-grid { grid-template-columns: 1fr; }
  .story-symbol { display: none; }
  .values-grid { grid-template-columns: 1fr; }
  .content-body { margin-top: calc(-1 * var(--space-lg)); }
}
</style>
