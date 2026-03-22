<script setup>
const [gameWidth, gameHeight] = [3840, 2160]
const { width, height } = useWindowSize()
const scale = computed(() => {
  const factor = Math.min(width.value / gameWidth, height.value / gameHeight)
  return `scale(${factor}, ${factor})`
})

cursorPolyfill()
</script>

<template>
  <div class="bg-black h-screen w-screen fixed top-0 left-0 flex justify-center items-center">
    <div :style="{ transform: scale }">
      <NuxtPage :style="{ height: `${gameHeight}px`, width: `${gameWidth}px` }" class="bg-black overflow-hidden" />
    </div>
  </div>
</template>