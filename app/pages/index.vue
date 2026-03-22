<script setup>
import Pizzicato from 'pizzicato'

function resumeAudio() {
  Pizzicato.context.resume()
}

const preloadImg = [
  'aquariumbottom.jpg',
  'aquariumleft.png',
  'aquariummiddle.png',
  'aquariumright.png',
  'aquariumtop.jpg',
  'dirtleft.png',
  'dirtmiddle.png',
  'dirtright.png',
  'fondaquariumleft.jpg',
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
  <nuxt-link class="block" to="/play" style="background: url(menu.jpg)" @click="resumeAudio">
    <div class="flex flex-col justify-center items-center h-full text-white">
      <div class="mt-[600px] blink text-[90px]">
        Click to play
      </div>

      <div class="credits">
        <a href="https://www.instagram.com/hellofitzfish" target="_blank" @click.stop>Code by @FITZFISH</a>
        <a href="https://www.instagram.com/louzeisbad" target="_blank" @click.stop>Art by @LOUZISBAD</a>
        <a href="https://www.instagram.com/lawrel.cloud" target="_blank" @click.stop>Art by @LAWREL.CLOUD</a>
        <a href="https://www.instagram.com/definitelynotpupp" target="_blank" @click.stop>Music & code by @DEFINITELYNOTPUPP</a>
      </div>
      
      <img src="/particles1.gif" class="absolute h-full w-full z-[99] hue pointer-events-none opacity-50">
      <img src="/particles2.gif" class="absolute h-full w-full z-[99] hue pointer-events-none opacity-10">
    </div>

    <img v-for="(img, index) in preloadImg" :key="index" :src="img" class="h-[1px] w-[1px] opacity-[0.1] pointer-events-none absolute">
  </nuxt-link>
</template>

<style scoped>
.hue {
  filter: hue-rotate(-70deg);
}

.blink {
  animation: blinker 2s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

.credits {
  position: relative;
  margin-top: 100px;

  a {
    text-align: center;
    font-size: 40px;
    display: block;
  }
}
</style>
