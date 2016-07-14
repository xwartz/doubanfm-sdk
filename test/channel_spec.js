import { expect } from 'chai'
import SDK from '../dist/index'

describe('#channel', () => {
  const sdk = new SDK()

  describe('#channels()', () => {
    it('it should return an object', (done) => {
      sdk.channels({}, (err, data) => {
        if (err) throw err
        expect(data).to.be.an('object')
        done()
      })
    })
  })

  describe('#hotChannels()', () => {
    it('it should return an array', (done) => {
      sdk.hotChannels({}, (err, data) => {
        if (err) throw err
        expect(data).to.be.an('array')
        done()
      })
    })
  })
})
