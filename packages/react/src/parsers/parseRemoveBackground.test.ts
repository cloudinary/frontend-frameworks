import 'mocha'
import assert from 'assert'
import { parseRemoveBackground } from './parseRemoveBackground'

describe('parseRemoveBackground: returns transformation for', () => {
  it('"false" option', () => {
    assert.equal(parseRemoveBackground(false), '')
  })

  it('"true" option', () => {
    assert.equal(parseRemoveBackground(true), 'e_background_removal')
  })

  it('"fineEdges" option', () => {
    assert.equal(parseRemoveBackground('fineEdges'), 'e_background_removal:fineedges_y')
  })
})
