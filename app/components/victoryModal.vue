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
    <div class="mt-[20px]"> Oh wow, you're still alive?! </div>
    <div> I mean, see, it was no big deal, right? </div>
    <div> Only took you {{ displayedTime }}! </div>
    <br>
    <a class="cursor-pointer" @click="reload"> Play again </a>
  </BaseModal>

  <div class="bg-black opacity-80 h-full w-full left-0 top-0 fixed"/>
</template>