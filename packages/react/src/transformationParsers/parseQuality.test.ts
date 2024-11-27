import 'mocha'
import assert from 'assert'
import { parseQuality } from './parseQuality'

describe('parseQuality: returns correct transformation component for', () => {
  it('"auto" option', () => {
    assert.equal(parseQuality('auto'), 'q_auto')
  })

  it('"auto:good" option', () => {
    assert.equal(parseQuality('auto:good'), 'q_auto:good')
  })

  it('"auto:eco" option', () => {
    assert.equal(parseQuality('auto:eco'), 'q_auto:eco')
  })

  it('"auto:low" option', () => {
    assert.equal(parseQuality('auto:low'), 'q_auto:low')
  })

  it('"auto:best" option', () => {
    assert.equal(parseQuality('auto:best'), 'q_auto:best')
  })

  it('"jpegmini" option', () => {
    assert.equal(parseQuality('jpegmini'), 'q_jpegmini')
  })

  it('"jpegmini:0" option', () => {
    assert.equal(parseQuality('jpegmini:0'), 'q_jpegmini:0')
  })

  it('"jpegmini:1" option', () => {
    assert.equal(parseQuality('jpegmini:1'), 'q_jpegmini:1')
  })

  it('"jpegmini:2" option', () => {
    assert.equal(parseQuality('jpegmini:2'), 'q_jpegmini:2')
  })

  it('"low" option', () => {
    assert.equal(parseQuality('low'), 'q_low')
  })

  it('"eco" option', () => {
    assert.equal(parseQuality('eco'), 'q_eco')
  })

  it('"medium" option', () => {
    assert.equal(parseQuality('medium'), 'q_medium')
  })

  it('"good" option', () => {
    assert.equal(parseQuality('good'), 'q_good')
  })

  it('"high" option', () => {
    assert.equal(parseQuality('high'), 'q_high')
  })

  it('"best" option', () => {
    assert.equal(parseQuality('best'), 'q_best')
  })
})
