<script setup>
defineProps({
  urchin: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <img
    :src="`urchinlight.png`"
    class="absolute z-[2]"
    :style="{ left: `${urchin.x}px`, top: `${urchin.y}px` }"
  >
</template>
