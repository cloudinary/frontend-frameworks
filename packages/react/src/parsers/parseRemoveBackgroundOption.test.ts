import 'mocha'
import assert from 'assert'
import { parseRemoveBackgroundOption } from './parseRemoveBackgroundOption'

describe('parseRemoveBackgroundOption: returns transformation for', () => {
  it('false value', () => {
    assert.equal(parseRemoveBackgroundOption(false), '')
  })

  it('true value', () => {
    assert.equal(parseRemoveBackgroundOption(true), 'e_background_removal')
  })

  it('string value', () => {
    assert.equal(parseRemoveBackgroundOption('fineEdges'), 'e_background_removal:fineedges_y')
  })
})
