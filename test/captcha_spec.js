import { expect } from 'chai'
import SDK from '../dist/index'

describe('#captcha_id()', () => {

  it('it should return a string', (done) => {
    const sdk = new SDK()
    sdk.captcha_id(null, (err, id) => {
      if (err) throw err
      expect(id).to.be.a('string')
      done()
    })
  })

})
