<script setup>
const props = defineProps({
  rivet: {
    type: [Number, Boolean],
    default: false
  },
  enabled: {
    type: Boolean,
    required: true
  }
})

defineEmits(['fix'])

const hitbox = computed(() => (({
  1: { left: '735px', top: '150px' },
  2: { left: '1655px', top: '325px' },
  3: { left: '1350px', top: '150px' },
})[props.rivet]))
</script>

<template>
  <div class="pointer-events-none" style="transform-style: preserve-3d;">
    <img class="absolute" :src="`/visall.png`">
    <Transition name="rivet">
      <img v-if="rivet" class="absolute" :src="`/vis${props.rivet}.png`">
    </Transition>
    <Transition name="shark">
      <img v-if="rivet" src="/shark.png" class="shark">
    </Transition>
    <div v-if="rivet" :style="hitbox" class="hitbox" :class="{ 'pointer-events-auto': enabled }" @click="$emit('fix')"/>
  </div>
</template>

<style scoped>
.hitbox {
  height: 80px;
  width: 80px;
  position: absolute;
  cursor: url(cursors/screw.png), none;
  z-index: 99;
}

.rivet-enter-active,
.rivet-leave-active {
  transition: opacity 2s ease;
}

.rivet-enter-from,
.rivet-leave-to {
  opacity: 0;
}

.shark {
  position: absolute;
  left: -3000px;
  top: 300px;
  transform: scale(3, 3) translateZ(-250px)
}

.shark-enter-active {
  transition: left 2s ease-in;
}

.shark-enter-from {
  left: 3000px;
}

.shark-enter-to {
  left: -3000px;
}
</style>