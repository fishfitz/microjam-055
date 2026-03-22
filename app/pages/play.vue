<script setup>
import { vOnClickOutside } from '@vueuse/components'
import { useGameAudio } from '@/composables/useGameAudio'

const look = ref({
  left: false,
  right: false,
  middle: false
})

const clean = ref({
  left: false,
  right: false,
  middle: false
})

const windowHP = ref({
  left: 100,
  right: 100,
  middle: 100
})

const victory = computed(() => Object.values(clean.value).every(v => v))
const loss = computed(() => Object.values(windowHP.value).some(v => !v))
const end = computed(() => victory.value || loss.value)

const initialTime = Date.now()
const timeElapsed = ref(0)
setInterval(() => {
  if (!end.value) {
    timeElapsed.value = Date.now() - initialTime
  }
}, 100)

// AUDIO: usually here the player has clicked something on the screen so the audio context is unlocked
// So you can play main theme here; pseudocode:
const { playMainTheme } = useGameAudio()
/*
  // import { throttle } from 'all-of-just/functions'
  playmaintheme()
  watch(timeElapsed, throttle(() => {
    if (timeElapsed.value > 1000 * 120) switchtothemevnr1()
    else if (timeElapsed.value > 1000 * 60) switchthemevnr2()
  }, 1000))
*/

const urchinsManager = useUrchins({ timeElapsed, end, windowHP })

const setLook = (key) => {
  if (look.value[key]) return

  const lookedSomewhere = Object.values(look.value).some(v => v === true)
  look.value = {
    left: false,
    right: false,
    middle: false
  }

  if (key && !lookedSomewhere) look.value[key] = true
}
</script>

<template>
  <div class="scene" :style="{ opacity: timeElapsed > 2000 ? 1 : 0 }">
    <div
      :class="{ 'look-left': look.left, 'look-right': look.right, 'look-middle': look.middle }"
      class="cube"
    >
      <div class="face face-left" @click="() => setLook('left')">
        <div style="background: url(fondaquariumleft.png);" class="push-1 pointer-events-none" />
        <img src="/particles1.gif" class="particles push-05 pointer-events-none opacity-80">
        <img src="/particles2.gif" class="particles push-02 pointer-events-none opacity-10">
        <div style="background: url(aquariumleft.png);" :class="{ 'pointer-events-none': look.right || look.left }" />
        <TransitionGroup name="urchins" tag="div" class="z-[2] pointer-events-none">
          <CreatureUrchin v-for="(urchin, index) in urchinsManager.urchins.left" :key="urchin.spawnTime" :urchin="urchin" :class="{ 'pointer-events-auto': look.left }" @remove="() => urchinsManager.remove('left', index)"/>
        </TransitionGroup>
        <DirtCanvas image="dirtleft.png" :enabled="look.left && !clean.left" @clean="() => clean.left = true"/>
        <DamageWindow :hp="windowHP" window-key="left"/>
      </div>

      <div class="face face-back"  @click="() => setLook('middle')">
        <div style="background: url(fondaquariummiddle.jpg);" class="push-1 pointer-events-none" />
        <img src="/particles1.gif" class="particles push-05 pointer-events-none opacity-80">
        <img src="/particles2.gif" class="particles push-02 pointer-events-none opacity-10">
        <div style="background: url(aquariummiddle.png);" />
        <TransitionGroup name="urchins" tag="div" class="z-[2] pointer-events-none">
          <CreatureUrchin v-for="(urchin, index) in urchinsManager.urchins.middle" :key="urchin.spawnTime" :urchin="urchin" :class="{ 'pointer-events-auto': look.middle }" @remove="() => urchinsManager.remove('middle', index)"/>
        </TransitionGroup>
        <DirtCanvas image="dirtmiddle.png" :enabled="look.middle && !clean.middle" @clean="() => clean.middle = true"/>
        <DamageWindow :hp="windowHP" window-key="middle"/>
      </div>
      
      <div v-on-click-outside="() => look.right && setLook()" class="face face-right" @click="() => setLook('right')">
        <div style="background: url(fondaquariumright.jpg);" class="push-1 pointer-events-none" />
        <img src="/particles1.gif" class="particles push-05 pointer-events-none opacity-80">
        <img src="/particles2.gif" class="particles push-02 pointer-events-none opacity-10">
        <div style="background: url(aquariumright.png);" :class="{ 'pointer-events-none': look.left || look.right }"/>
        <TransitionGroup name="urchins" tag="div" class="z-[2] pointer-events-none">
          <CreatureUrchin v-for="(urchin, index) in urchinsManager.urchins.right" :key="urchin.spawnTime" :urchin="urchin" :class="{ 'pointer-events-auto': look.right }" @remove="() => urchinsManager.remove('right', index)"/>
        </TransitionGroup>
        <DirtCanvas image="dirtright.png" :enabled="look.right && !clean.right"  @clean="() => clean.right = true"/>
        <DamageWindow :hp="windowHP" window-key="right"/>
      </div>

      <div class="face face-top" style="background: url(aquariumtop.jpg);" @click="() => setLook()" />
      <div class="face face-bottom" style="background: url(aquariumbottom.jpg);" @click="() => setLook()" />
    </div>

    <LossModal v-if="loss" />
    <VictoryModal v-if="victory" :time-elapsed="timeElapsed" />
  </div>
</template>

<style scoped>
.scene {
  opacity: 0;
  perspective: 1450px;
  perspective-origin: 50% 50%;
  transition: opacity 4s ease-in;
}

.cube {
  --sceneHeight: 2160px;
  --sceneWidth: 3840px;
  --cubeSize: 2160px;
  --offset: 200px;

  --marginTop: calc(var(--sceneHeight) - var(--cubeSize));
  --marginLeft: calc(var(--sceneWidth) - var(--cubeSize));

  --translate: calc(var(--cubeSize) / 2);
  --translate-neg: calc(var(--translate) * -1);

  top: calc(var(--marginTop) / 2);
  left: calc(var(--marginLeft) / 2);
  width: 0px;
  height: 0px;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(-440px) rotateY(0);
  transition: all 1s;

  &.look-middle {
    transform: translateZ(1000px) rotateY(0);
    .face-back .push-1 { transform: translateZ(-300px)!important; }
  }

  &.look-left {
    transform: translateZ(300px) translateX(800px) rotateY(-85deg);
    .push-1 { transform: translateZ(300px) scale(1.15, 1.15); }
  }

  &.look-right {
    transform: translateZ(2500px) translateX(1000px) rotateY(85deg);
    .push-1 { transform: translateZ(300px) scale(1.15, 1.15); }
  }
}

.face {
  position: absolute;
  width: var(--cubeSize);
  height: var(--cubeSize);
  border: 2px solid black;
  line-height: 200px;
  font-size: 40px;
  font-weight: bold;
  color: white;
  text-align: center;
  transition: all 1s;
  transform-style: preserve-3d;

  div, .particles {
    transition: all 1s;
    position: absolute;
    height: 100%;
    width: 100%;
  }
}

.particles {
  filter: hue-rotate(-70deg);
}

.face-right  { transform: rotateY( 90deg) translateZ(var(--translate)) scaleX(-1.01) scaleY(1.02); }
.face-back   { transform: translateZ(var(--translate-neg)) scaleY(1.02) scaleX(1.02); }
.face-left   { transform: rotateY(-90deg) translateZ(var(--translate)) scaleX(-1.01) scaleY(1.02); }
.face-top    { transform: rotateX( 90deg) translateZ(var(--translate)) scaleY(-1.01) scaleX(1.02); }
.face-bottom { transform: rotateX(-90deg) translateZ(var(--translate)) scaleY(-1.01) scaleX(1.02); }

.push-1 { transform: translateZ(300px) scale(1.7, 1.3); }
.push-05 { transform: translateZ(150px) }
.push-08 { transform: translateZ(-230px) }
.pull-1 { transform: translateZ(-1px); }

.face-back {
  .push-1 { transform: translateZ(-300px)!important; }
  .push-05 { transform: translateZ(-150px) }
  .push-08 { transform: translateZ(-230px) }
  .pull-1 { transform: translateZ(1px)!important; }
}

.urchins-enter-active,
.urchins-leave-active {
  transition: all 0.5s ease;
}

.urchins-enter-from,
.urchins-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>