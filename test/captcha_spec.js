import { expect } from 'chai'
import SDK from '../dist/index'

describe('#captcha', () => {
  const sdk = new SDK()

  describe('#captchaId()', () => {
    it('it should return a string', (done) => {
      sdk.captchaId(null, (err, id) => {
        if (err) throw err

        expect(id).to.be.a('string')
        done()
      })
    })
  })

