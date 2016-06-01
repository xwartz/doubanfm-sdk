import { expect } from 'chai'
import SDK from '../dist/index'

describe('#captcha', () => {
  const sdk = new SDK()

  describe('#captcha_id()', () => {
    it('it should return a string', (done) => {
      sdk.captcha_id(null, (err, id) => {
        if (err) throw err
        expect(id).to.be.a('string')
        done()
      })
    })
  })

  describe('#captcha_pic()', () => {
    it('it should return an object', (done) => {
      sdk.captcha_pic({ id: 1234 }, (err, data) => {
        if (err) throw err
        expect(data).to.be.an('object')
        done()
      })
    })
  })
})
