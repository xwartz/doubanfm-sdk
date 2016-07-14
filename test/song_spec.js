import { expect } from 'chai'
import SDK from '../dist/index'

describe('#song', () => {
  const sdk = new SDK()

  describe('#skip()', () => {
    it('it should return an array', (done) => {
      sdk.skip({}, (err, data) => {
        if (err) throw err
        expect(data).to.be.an('array')
        done()
      })
    })
  })

  describe('#star()', () => {
    it('it should return an array', (done) => {
      sdk.star({ channel: '1', sid: '1395259' }, (err, data) => {
        if (err) throw err
        expect(data).to.be.an('array')
        done()
      })
    })
  })

  describe('#unstar()', () => {
    it('it should return an array', (done) => {
      sdk.unstar({ channel: '1', sid: '1395259' }, (err, data) => {
        if (err) throw err
        expect(data).to.be.an('array')
        done()
      })
    })
  })

  describe('#neverPlayAgain()', () => {
    it('it should return an array', (done) => {
      sdk.neverPlayAgain({ channel: '1', sid: '1395259' }, (err, data) => {
        if (err) throw err
        expect(data).to.be.an('array')
        done()
      })
    })
  })

  describe('#personalChannel()', () => {
    it('it should return an array', (done) => {
      sdk.personalChannel({}, (err, data) => {
        if (err) throw err
        expect(data).to.be.an('array')
        done()
      })
    })
  })

  describe('#personalLikeChannel()', () => {
    it('it should return an array', (done) => {
      sdk.personalLikeChannel({}, (err, data) => {
        if (err) throw err
        expect(data).to.be.an('array')
        done()
      })
    })
  })

  describe('#favChannels()', () => {
    it('it should return an array', (done) => {
      sdk.favChannels({}, (err, data) => {
        if (err) throw err
        expect(data).to.be.an('array')
        done()
      })
    })
  })
})
