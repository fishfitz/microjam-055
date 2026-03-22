<script setup>
const preloadImg = [
  'aquariumbottom.jpg',
  'aquariumleft.png',
  'aquariummiddle.png',
  'aquariumright.png',
  'aquariumtop.jpg',
  'dirtleft.png',
  'dirtmiddle.png',
  'dirtright.png',
  'fondaquariumleft.png',
  'fondaquariummiddle.jpg',
  'fondaquariumright.jpg',
  'particles1.gif',
  'particles2.gif',
  'urchin.png',
  'urchinhit.png',
  'windowlefthighdmg.png',
  'windowleftlightdmg.png',
  'windowleftmediumdmg.png',
  'windowmiddlehighdmg.png',
  'windowmiddlelightdmg.png',
  'windowmiddlemediumdmg.png',
  'windowrighthighdmg.png',
  'windowrightlightdmg.png',
  'windowrightmediumdmg.png',
  'visall.png',
  'vis1.png',
  'vis2.png',
  'vis3.png'
]
</script>

<template>
  <nuxt-link class="block" to="/play">
    <div class="flex flex-col justify-center items-center h-full text-white">
      <h1 class="text-[120px] mb-4"> Micro Jam 055 </h1>
      <div class="blink text-[64px]">
        Click to play
      </div>
    </div>

    <img v-for="(img, index) in preloadImg" :key="index" :src="img" class="h-[1px] w-[1px] opacity-[0.1] pointer-events-none absolute">
  </nuxt-link>
</template>

<style scoped>
.blink {
  animation: blinker 2s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
