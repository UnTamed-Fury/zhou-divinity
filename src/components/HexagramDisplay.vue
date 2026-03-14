<script setup lang="ts">
import { computed } from 'vue';
import type { LineValue } from '../logic/types';

const props = defineProps<{
  lines: LineValue[];
  title?: string;
  isFuture?: boolean;
}>();

const displayLines = computed(() => {
  return [...props.lines].reverse();
});

// Returns a hand-drawn SVG path with slight natural variance
function getLinePath(isYang: boolean, segment?: 'left' | 'right') {
  if (isYang) {
    // A single long brush stroke with slight organic curves
    return "M 10,15 C 80,12 150,18 290,15";
  } else {
    if (segment === 'left') {
      // Left segment of a broken line
      return "M 10,15 C 50,17 90,13 130,15";
    } else {
      // Right segment of a broken line
      return "M 170,15 C 210,13 250,17 290,15";
    }
  }
}
</script>

<template>
  <div class="hexagram-container">
    <div v-if="title" class="hex-label">{{ title }}</div>
    <div class="svg-wrapper">
      <svg viewBox="0 0 340 180" class="hexagram-svg" preserveAspectRatio="xMidYMid meet">
        <g v-for="(line, idx) in displayLines" :key="idx" 
           :class="['hex-line', { changing: line === 6 || line === 9 }]"
           :style="{ animationDelay: (5 - idx) * 0.15 + 's' }">
          
          <g :transform="`translate(0, ${idx * 30})`">
            <!-- Yang Line (Solid) -->
            <template v-if="line === 7 || line === 9">
              <path :d="getLinePath(true)" class="brush-stroke" />
              <circle v-if="line === 9" cx="320" cy="15" r="6" class="marker-circle" />
            </template>
            
            <!-- Yin Line (Broken) -->
            <template v-else>
              <path :d="getLinePath(false, 'left')" class="brush-stroke" />
              <path :d="getLinePath(false, 'right')" class="brush-stroke" />
              <g v-if="line === 6" transform="translate(312, 7)">
                <line x1="0" y1="0" x2="16" y2="16" class="marker-cross" />
                <line x1="16" y1="0" x2="0" y2="16" class="marker-cross" />
              </g>
            </template>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.hexagram-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 320px;
}

.hex-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--gold);
  margin-bottom: var(--space-md);
  font-weight: 700;
}

.svg-wrapper {
  width: 100%;
  aspect-ratio: 340 / 180;
}

.hexagram-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.brush-stroke {
  fill: none;
  stroke: var(--ink);
  stroke-width: 10;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: stroke 0.4s ease;
}

.changing .brush-stroke {
  stroke: var(--cinnabar);
}

.marker-circle {
  fill: none;
  stroke: var(--cinnabar);
  stroke-width: 2;
}

.marker-cross {
  stroke: var(--cinnabar);
  stroke-width: 2;
  stroke-linecap: round;
}

/* Bottom-up Ink Bleed Animation */
.hex-line {
  opacity: 0;
  animation: inkDraw 1s cubic-bezier(0.2, 0, 0.2, 1) forwards;
}

@keyframes inkDraw {
  from {
    opacity: 0;
    transform: translateY(15px);
    stroke-dasharray: 300;
    stroke-dashoffset: 300;
  }
  to {
    opacity: 1;
    transform: translateY(0);
    stroke-dashoffset: 0;
  }
}
</style>
