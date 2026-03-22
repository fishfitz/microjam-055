import { clone } from 'all-of-just/collections'
import { randomInteger } from 'all-of-just/numbers'
import * as squirrelly from 'squirrelly'
import functions from '~/assets/functions.js'
import variables from '~/assets/variables.js'

squirrelly.defaultConfig.autoEscape = false

export default () => {
  const game = reactive({})
  const state = reactive({})
  const speakers = {}

  const render = (text) => squirrelly.render(text, state, { useWith: true })
  const evalCode = (code) => typeof code === 'function' ? code() : new Function('game', 'code', `
    console.log('Script:', code)
    with (game) {
      return eval(\`\${code}\`)
    }
  `)(game, code)

  const getLine = () => {
    const line = scenes[state.sceneId]?.lines[state.lineIndex] || {}
    return {
      ...line,
      text: line.text ? render(line.text) : undefined,
      speaker: line.speaker ? { id: line.speaker, ...speakers[line.speaker] } : undefined,
      choices: line.choices ? line.choices.map(c => ({ ...c, text: render(c.text) })) : undefined
    }
  }

  const newGame = () => {
    Object.assign(state, {
      sceneId: 'start',
      lineIndex: 0,
      journal: [],
      isNewGame: true,
      ...variables
    })
  }

  const goto = (sceneId, lineIndex = 0) => {
    state.sceneId = sceneId
    state.lineIndex = lineIndex
    if (getLine().type === 'code') resolve()
    else updateJournal()
  }

  const resolve = () => {
    const line = getLine()
    if (!line) return
    if (line.condition && !evalCode(line.condition)) {
      state.lineIndex++
      return resolve()
    }
    if (line.type === 'code') {
      evalCode(line.code)
      if (getLine().type === 'code') {
        state.lineIndex++
        resolve()
      }
    }
  }

  const updateJournal = () => {
    if (getLine().type === 'text') state.journal.push(clone(getLine()))
  }

  const next = () => {
    if (getLine().type === 'text') {
      console.log('go', getLine())

      state.isNewGame = false
      state.lineIndex++
      resolve()
    }
  }

  newGame()

  Object.assign(game, {
    functions,
    state,
    newGame,
    goto,
    next,
    random: randomInteger,
    line: computed(() => getLine())
  })

  return game
}