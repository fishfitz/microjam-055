import { random } from 'all-of-just/arrays'
import { randomInteger } from 'all-of-just/numbers'

export default ({ timeElapsed, end, windowHP }) => {
  const urchins = ref({
    left: [],
    middle: [],
    right: [],
  })

  const spawnDelay = () => {
    if (timeElapsed.value < 1000 * 60) return randomInteger(8000, 12000)
    if (timeElapsed.value < 1000 * 120) return randomInteger(4000, 8000)
    return randomInteger(4000, 8000)
  }

  const spawnUrchin = () => {
    if (end.value) return

    const key = random(['left', 'middle', 'right'])
    urchins.value[key].push({
      x: key === 'middle' ? randomInteger(420, 1520) : randomInteger(key === 'left' ? 100 : 300, 1780),
      y: key === 'middle' ? randomInteger(420, 1520) : randomInteger(500, 1500),
      spawnTime: timeElapsed.value,
      damageDealt: 0
    })
    
    setTimeout(spawnUrchin, spawnDelay())
  }
  
  setTimeout(spawnUrchin, spawnDelay())

  const damageWindow = () => {
    if (end.value) return

    Object.keys(urchins.value).forEach(key => {
      urchins.value[key].forEach(urchin => {
        if (timeElapsed.value - urchin.spawnTime > 1000) {
          windowHP.value[key] -= 1
          urchin.damageDealt += 1
        }
      })
    })

    setTimeout(damageWindow, 1000)
  }

  setTimeout(damageWindow, 100)

  return reactive({
    urchins,
    remove: (key, index) => {
      console.log(key, index)
      urchins.value[key].splice(index, 1)
    }
  })
}