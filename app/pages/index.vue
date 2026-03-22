<template>
  <div>
    <div class="flex flex-col justify-center items-center h-full text-white">
      <h1 class="text-[120px] mb-4"> Micro Jam 055 </h1>
      <nuxt-link to="/play" class="blink text-[64px]">
        Click to play
      </nuxt-link>
    </div>
  </div>
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
