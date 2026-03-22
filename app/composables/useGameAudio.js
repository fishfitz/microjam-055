import { onMounted, onUnmounted } from 'vue'
import Pizzicato from 'pizzicato'

let theme = null
let hardTheme = null
let harderTheme = null
let cleanSound = null

export function useGameAudio() {
  onMounted(() => {
    theme = new Pizzicato.Sound({
      source: 'file',
      options: { path: '/sounds/main-v1.1.mp3', loop: true, volume: 0.5 }
    }, () => Pizzicato.context.resume().then(() => theme.play()))

    hardTheme = new Pizzicato.Sound({
      source: 'file',
      options: { path: '/sounds/main-hard.mp3', loop: true, volume: 0.5 }
    })

    harderTheme = new Pizzicato.Sound({
      source: 'file',
      options: { path: '/sounds/main-harder.mp3', loop: true, volume: 0.5 }
    })

    cleanSound = new Pizzicato.Sound({
      source: 'file',
      options: { path: '/sounds/clean-glass.mp3', loop: true, volume: 0.4 }
    })
  })

  onUnmounted(() => {
    theme?.stop()
    hardTheme?.stop()
    harderTheme?.stop()
    cleanSound?.stop()
    theme = null
    hardTheme = null
    harderTheme = null
    cleanSound = null
  })

  function switchToHard() {
    theme?.stop()
    hardTheme?.play()
  }

  function switchToHarder() {
    theme?.stop()
    hardTheme?.stop()
    harderTheme?.play()
  }

  return { switchToHard, switchToHarder }
}

export function startCleaning() { cleanSound?.play() }
export function stopCleaning() { cleanSound?.stop() }