<script setup>
import { throttle } from 'all-of-just/functions'

defineProps({
  urchin: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['remove'])
const urchinElement = ref()

const hp = ref(3)
const isHit = ref(false)
const hit = throttle(() => {
  isHit.value = true
  setTimeout(() => (isHit.value = false), 250)
  hp.value -= 1
  if (hp.value <= 0) emit('remove')
}, 250)
</script>

<template>
  <img
    ref="urchinElement"
    :src="isHit ? '/urchinhit.png' : '/urchin.png'"
    class="absolute z-[2] urchin"
    :style="{ left: `${urchin.x}px`, top: `${urchin.y}px` }"
    :class="{ isHit }"
    @click="hit"
  >
</template>

<style scoped>
.urchin {
  cursor: url("/cursors/urchinhit.png"), none;
}

.isHit {
  animation: shaking 0.25s infinite;
}

@keyframes shaking {
  0% { transform: translateX(0) }
  25% { transform: translateX(10px) }
  50% { transform: translateX(-5px) }
  75% { transform: translateX(10px) }
  100% { transform: translateX(0) }
}
</style>
