<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  name: string;
  chinese: string;
  symbolic: string;
  alchemical: string;
  isUpper?: boolean;
}>();

// Map trigram names to their 3 lines (bottom to top)
const trigramMap: Record<string, number[]> = {
  "CH'IEN": [1, 1, 1], // Heaven
  "K'UN": [0, 0, 0],   // Earth
  "CH\u00eaN": [1, 0, 0], // Thunder (Arousing)
  "K'AN": [0, 1, 0],   // Water (Abysmal)
  "K\u00eaN": [0, 0, 1], // Mountain (Stillness)
  "SUN": [0, 1, 1],    // Wind/Wood (Gentle)
  "LI": [1, 0, 1],     // Fire (Clinging)
  "TUI": [1, 1, 0]     // Lake (Joyous)
};

const lines = computed(() => {
  return trigramMap[props.chinese] || [0, 0, 0];
});
</script>

<template>
  <div class="trigram">
    <div class="trigram-lines">
      <div v-for="(l, idx) in [...lines].reverse()" :key="idx" :class="['mini-line', l === 1 ? 'yang' : 'yin']">
        <div v-if="l === 1" class="solid"></div>
        <div v-else class="broken">
          <div class="segment"></div>
          <div class="gap"></div>
          <div class="segment"></div>
        </div>
      </div>
    </div>
    <div class="trigram-info">
      <span class="type">{{ isUpper ? 'Above' : 'Below' }}</span>
      <span class="name">{{ chinese }}</span>
      <span class="symbol">{{ alchemical }}</span>
    </div>
  </div>
</template>

<style scoped>
.trigram {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.trigram-lines {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 40px;
}

.mini-line {
  height: 4px;
}

.solid {
  width: 100%;
  height: 100%;
  background: var(--color-ink);
}

.broken {
  display: flex;
  width: 100%;
  height: 100%;
}

.segment {
  flex: 1;
  background: var(--color-ink);
}

.gap {
  width: 25%;
}

.trigram-info {
  display: flex;
  flex-direction: column;
}

.type {
  font-size: 0.7rem;
  color: var(--color-gold);
  text-transform: uppercase;
}

.name {
  font-weight: bold;
  font-size: 0.9rem;
}

.symbol {
  font-size: 0.8rem;
  color: #666;
}
</style>
