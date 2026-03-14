<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'select', method: 'coin' | 'yarrow'): void;
}>();

const selected = ref<'coin' | 'yarrow'>('coin');

function handleSelect() {
  emit('select', selected.value);
}
</script>

<template>
  <div class="method-selector card">
    <header class="sel-header">
      <span class="label">Consultation Method</span>
      <h3>Select your path</h3>
    </header>

    <div class="options">
      <label class="option" :class="{ active: selected === 'coin' }">
        <input type="radio" v-model="selected" value="coin" />
        <div class="content">
          <div class="h-group">
            <span class="idx">01</span>
            <strong>Three-Coin Method</strong>
          </div>
          <p>The modern approach. Direct and immediate, suitable for clear focus and rapid insight.</p>
        </div>
      </label>

      <label class="option" :class="{ active: selected === 'yarrow' }">
        <input type="radio" v-model="selected" value="yarrow" />
        <div class="content">
          <div class="h-group">
            <span class="idx">02</span>
            <strong>Yarrow Stalk Method</strong>
          </div>
          <p>The traditional technique. A slower, meditative process that aligns with the classic probabilities of the Zhou Dynasty.</p>
        </div>
      </label>
    </div>

    <div class="actions">
      <button @click="handleSelect">Open the Dialogue</button>
    </div>
  </div>
</template>

<style scoped>
.method-selector {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.sel-header {
  margin-bottom: 3rem;
}

.sel-header .label {
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 0.7rem;
  color: var(--gold);
  margin-bottom: 1rem;
}

.sel-header h3 {
  font-size: 2.5rem;
  font-style: italic;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 4rem;
  text-align: left;
}

.option {
  display: flex;
  padding: 2.5rem;
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.option:hover {
  background: #fafafa;
}

.option.active {
  border-color: var(--cinnabar);
  background: rgba(150, 45, 45, 0.02);
}

.option.active::after {
  content: '✓';
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: var(--cinnabar);
  font-weight: bold;
}

.option input {
  display: none;
}

.h-group {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.idx {
  font-size: 0.7rem;
  color: var(--gold);
  font-weight: bold;
}

.content strong {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  color: var(--ink);
}

.content p {
  margin: 0;
  font-size: 0.95rem;
  color: var(--slate);
  line-height: 1.6;
}

.actions {
  display: flex;
  justify-content: center;
}
</style>
