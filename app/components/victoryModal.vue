<script setup>
const props = defineProps({
  timeElapsed: {
    type: Number,
    default: 0
  }
})

const displayedTime = computed(() => {
  const date = new Date(props.timeElapsed)
  return `${date.getMinutes()}:${date.getSeconds()}`
})

const reload = () => (window.location.reload())
</script>

<template>
  <BaseModal>
    🎉
    <div> You survived your shift! ({{ displayedTime }}) </div>
    <a @click="reload"> Play again </a>
  </BaseModal>
</template>