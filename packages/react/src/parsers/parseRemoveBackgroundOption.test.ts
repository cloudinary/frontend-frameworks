import 'mocha'
import assert from 'assert'
import { parseRemoveBackgroundOption } from './parseRemoveBackgroundOption'

describe('parseRemoveBackgroundOption: returns transformation for', () => {
  it('"false" option', () => {
    assert.equal(parseRemoveBackgroundOption(false), '')
  })

  it('"true" option', () => {
    assert.equal(parseRemoveBackgroundOption(true), 'e_background_removal')
  })

  it('"fineEdges" option', () => {
    assert.equal(parseRemoveBackgroundOption('fineEdges'), 'e_background_removal:fineedges_y')
  })
})
