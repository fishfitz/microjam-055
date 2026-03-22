import { randomInteger } from 'all-of-just/numbers'

export default ({ timeElapsed, end, windowHP }) => {
  const rivetMissing = ref(false)

  const spawnDelay = () => {
    if (timeElapsed.value < 1000 * 60) return randomInteger(15000, 20000)
    if (timeElapsed.value < 1000 * 120) return randomInteger(10000, 15000)
    return randomInteger(5000, 10000)
  }

  const spawnRivet = () => {
    if (end.value || rivetMissing.value) return
    setTimeout(() => shakeScreen(), 1000)
    // AUDIO: shark pass here

    rivetMissing.value = randomInteger(1, 3)
    setTimeout(spawnRivet, spawnDelay())
  }
  
  setTimeout(spawnRivet, 4000 + spawnDelay())

  const damageWindow = () => {
    if (end.value || !rivetMissing.value) return
    windowHP.value.middle -= 2
    setTimeout(damageWindow, 1000)
  }

  setTimeout(damageWindow, 1000)

  return reactive({
    rivetMissing,
    remove: () => {
      rivetMissing.value = false
    }
  })
}