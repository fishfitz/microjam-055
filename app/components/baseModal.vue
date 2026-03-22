<template>
  <div
    :style="`background-image: url(/modal.png); background-size: cover;`" 
    class="z-[10] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-[60px] h-[488px] w-[1580px] text-[48px] rounded-[10px] text-center">
    <slot/>
  </div>
</template>