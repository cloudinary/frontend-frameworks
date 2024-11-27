import 'mocha'
import assert from 'assert'
import { parseFormat } from './parseFormat'

describe('parseFormat', () => {
  it('returns URL part for any format', () => {
    assert.equal(parseFormat('auto'), 'f_auto')
  })
})
