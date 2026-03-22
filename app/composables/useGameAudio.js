import { onMounted, onUnmounted } from 'vue'
import Pizzicato from 'pizzicato'

let theme = null
let hardTheme = null
let harderTheme = null
let cleanSound = null
let urchinSpawnLeft = null
let urchinSpawnMiddle = null
let urchinSpawnRight = null
let sharkSound = null
let rivetGlingSound = null
let rivetFixSound = null

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

    const urchinPans = { left: -0.8, middle: 0, right: 0.8 }
    urchinSpawnLeft = new Pizzicato.Sound({ source: 'file', options: { path: '/sounds/urchin.mp3', loop: false, volume: 0.7 } })
    urchinSpawnLeft.addEffect(new Pizzicato.Effects.StereoPanner({ pan: urchinPans.left }))
    urchinSpawnMiddle = new Pizzicato.Sound({ source: 'file', options: { path: '/sounds/urchin.mp3', loop: false, volume: 0.7 } })
    urchinSpawnMiddle.addEffect(new Pizzicato.Effects.StereoPanner({ pan: urchinPans.middle }))
    urchinSpawnRight = new Pizzicato.Sound({ source: 'file', options: { path: '/sounds/urchin.mp3', loop: false, volume: 0.7 } })
    urchinSpawnRight.addEffect(new Pizzicato.Effects.StereoPanner({ pan: urchinPans.right }))

    sharkSound = new Pizzicato.Sound({ source: 'file', options: { path: '/sounds/aligator.mp3', loop: false, volume: 0.8 } })
    rivetGlingSound = new Pizzicato.Sound({ source: 'file', options: { path: '/sounds/rivet-gling.mp3', loop: false, volume: 0.8 } })
    rivetFixSound = new Pizzicato.Sound({ source: 'file', options: { path: '/sounds/rivet-fix.mp3', loop: false, volume: 0.8 } })
  })

  onUnmounted(() => {
    theme?.stop()
    hardTheme?.stop()
    harderTheme?.stop()
    cleanSound?.stop()
    urchinSpawnLeft?.stop()
    urchinSpawnMiddle?.stop()
    urchinSpawnRight?.stop()
    sharkSound?.stop()
    rivetGlingSound?.stop()
    rivetFixSound?.stop()
    theme = null
    hardTheme = null
    harderTheme = null
    cleanSound = null
    urchinSpawnLeft = null
    urchinSpawnMiddle = null
    urchinSpawnRight = null
    sharkSound = null
    rivetGlingSound = null
    rivetFixSound = null
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

export function playUrchinSpawn(key) {
  const sound = key === 'left' ? urchinSpawnLeft : key === 'right' ? urchinSpawnRight : urchinSpawnMiddle
  sound?.stop()
  sound?.play()
}

export function playShark() { sharkSound?.stop(); sharkSound?.play() }
export function playRivetGling() { rivetGlingSound?.stop(); rivetGlingSound?.play() }
export function playRivetFix() { rivetFixSound?.stop(); rivetFixSound?.play() }