<script setup lang="ts">
defineEmits<{
  (e: 'home'): void;
}>();
</script>

<template>
  <div class="not-found card">
    <div class="broken-hex">
      <div class="line yin"></div>
      <div class="line yang"></div>
      <div class="line broken"></div>
    </div>
    <h1>404: The Hexagram is Broken</h1>
    <p>You have wandered into the void between changes. This path does not exist in the Book of Changes.</p>
    <button @click="$emit('home')">Return to the Center</button>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 5rem 2rem;
  max-width: 600px;
  margin: 4rem auto;
}

.broken-hex {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100px;
  margin: 0 auto 2rem;
  opacity: 0.3;
}

.line {
  height: 8px;
  background: var(--color-ink);
}

.line.broken {
  background: transparent;
  border: 2px dashed var(--color-accent);
}

.line.yang { width: 100%; }
.line.yin { width: 100%; height: 8px; display: flex; gap: 20%; background: transparent; }
.line.yin::before, .line.yin::after { content: ''; flex: 1; background: var(--color-ink); }

h1 {
  font-family: var(--font-serif);
  color: var(--color-accent);
  margin-bottom: 1rem;
}

p {
  margin-bottom: 2.5rem;
  font-style: italic;
}
</style>
