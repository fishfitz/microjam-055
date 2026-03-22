<script setup>
  import { throttle } from 'all-of-just/functions'

  const props = defineProps({
    image: {
      type: String,
      required: true
    },
    enabled: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['clean'])

  const canvas = ref()
  const interractive = ref()

  const getMouse = (e) => {
    const rect = canvas.value.getBoundingClientRect();

    const scaleX = canvas.value.width / rect.width;
    const scaleY = canvas.value.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }
  
  onMounted(() => {
    const ctx = canvas.value.getContext('2d');

    const getDirtyPixels = () => {
      const imageData = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height);
      const pixels = imageData.data;
      let dirtyCount = 0;

      for (let i = 3; i < pixels.length; i += 4) {
        dirtyCount += pixels[i] / 100
      }

      return dirtyCount
    }

    let initialDirtyPixels
    const checkClean = throttle(() => {
      const dirtyCount = getDirtyPixels()
      console.log((initialDirtyPixels - dirtyCount) / initialDirtyPixels)
      if (((initialDirtyPixels - dirtyCount) / initialDirtyPixels) > 0.85) {
        console.log('clean')
        emit('clean')
      }
    }, 250)

    const img = new Image();
    img.src = props.image;

    img.onload = () => {
      canvas.value.width = img.width;
      canvas.value.height = img.height;
      ctx.drawImage(img, 0, 0);
      initialDirtyPixels = getDirtyPixels()
    };

    const isCleaning = ref(false); // AUDIO: you can watch(isCleaning, () => {}) to check if the player is cleaning stuff

    interractive.value.addEventListener('mousedown', () => {
      isCleaning.value = true;
    });

    interractive.value.addEventListener('mouseup', () => {
      isCleaning.value = false;
      ctx.beginPath();
    });

    interractive.value.addEventListener('mouseleave', () => {
      isCleaning.value = false;
    });

    interractive.value.addEventListener('mousemove', (e) => {
      if (!isCleaning.value) return;
      const { x, y } = getMouse(e);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha = 0.25;

      const radius = 150;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.25)');
      gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.15)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      checkClean()
    });
  })
</script>

<template>
  <canvas ref="canvas" class="absolute left-0 top-0 opacity-[0.97] pointer-events-none z-[2]"/>
  <div ref="interractive" :class="{ 'pointer-events-none': !enabled }" class="absolute left-0 top-0 z-[0] h-full w-full dirt"/>
</template>

<style scoped>
  .dirt {
    cursor: url("/cursors/clean.png"), none;
  }
</style>