import { onMounted, onUnmounted } from 'vue'
import Pizzicato from 'pizzicato'

let theme = null

export function useGameAudio() {
  onMounted(() => {
    theme = new Pizzicato.Sound({
      source: 'file',
      options: { path: 'public/sounds/main v1.1.ogg', loop: true, volume: 0.5 }
    }, () => theme.play())
  })

  onUnmounted(() => {
    theme.stop()
    theme = null
  })

  return { theme }
}