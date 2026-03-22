<script setup>
const props = defineProps({
  windowKey: {
    type: String,
    required: true
  },
  hp: {
    type: Object,
    required: true
  }
})

const opacity = computed(() => (100 - props.hp[props.windowKey]) / 100)
const image = computed(() => {
  if (props.hp[props.windowKey] > 75) return `window${props.windowKey}lightdmg.png`
  if (props.hp[props.windowKey] > 50) return `window${props.windowKey}mediumdmg.png`
  return `window${props.windowKey}highdmg.png`
})
</script>

<template>
  <div v-if="hp[windowKey] < 95" class="z-[3] invert pointer-events-none" :style="{ backgroundImage: `url(${image})`, opacity }"/>
</template>