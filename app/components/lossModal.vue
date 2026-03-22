<script setup>
const reload = () => (window.location.reload())
</script>

<template>
  <BaseModal>
    <div class="mt-[50px]"> Hm, well... you're dead (or even worse, you're fired). </div>
    <div> Hopefully you'll do better in the next life. </div>

    <br>
    <a class="cursor-pointer" @click="reload"> Play again </a>
  </BaseModal>

  <div class="bg-black opacity-80 h-full w-full left-0 top-0 fixed"/>
</template>