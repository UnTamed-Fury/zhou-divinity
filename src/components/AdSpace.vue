<script setup lang="ts">
// AdSpace component for Google AdSense placeholders
defineProps<{
  slotId?: string;
  type?: 'horizontal' | 'vertical' | 'square';
}>();
</script>

<template>
  <div :class="['ad-space', type || 'horizontal']">
    <div class="ad-label">ADVERTISEMENT</div>
    <div class="ad-placeholder">
      <!-- 
        Actual Google AdSense code for publisher ca-pub-9953974012200353
        Example usage for a specific slot:
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-9953974012200353"
             data-ad-slot="YOUR_SLOT_ID"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      -->
      <div class="dummy-ad">
        <p>Google AdSense Area</p>
        <span>Publisher: ca-pub-9953974012200353</span>
        <br/>
        <span>Slot ID: {{ slotId || 'Auto' }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ad-space {
  margin: var(--space-lg) auto;
  text-align: center;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.ad-label {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: var(--gold);
  margin-bottom: var(--space-xs);
  opacity: 0.6;
}

.ad-placeholder {
  background: rgba(26, 26, 27, 0.03);
  border: 1px dashed var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
}

.horizontal { max-width: 728px; min-height: 90px; }
.square { max-width: 300px; min-height: 250px; }
.vertical { max-width: 160px; min-height: 600px; }

.dummy-ad {
  padding: var(--space-md);
  color: var(--slate);
  font-family: var(--font-heading);
}

.dummy-ad p {
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
}

.dummy-ad span {
  font-size: 0.7rem;
  opacity: 0.7;
}
</style>
