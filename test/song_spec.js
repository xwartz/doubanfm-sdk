import { expect } from 'chai'
import SDK from '../dist/index'

describe('#songs', () => {
  const sdk = new SDK()

  describe('#skip()', () => {
    it('it should return an array', (done) => {
      sdk.skip({}, (err, data) => {
        if (err) throw err
        expect(data).to.be.a('array')
        done()
      })
    })
  })
})
