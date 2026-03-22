<script setup>
const reload = () => (window.location.reload())
</script>

<template>
  <BaseModal>
    💀
    <div> You're dead (or even worse, you're fired) </div>
    <a @click="reload"> Play again </a>
  </BaseModal>

  <div class="bg-black opacity-50 h-full w-full left-0 top-0 fixed"/>
</template>