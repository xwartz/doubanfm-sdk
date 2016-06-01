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

  describe('#never_play_again()', () => {
    it('it should return an array', (done) => {
      sdk.never_play_again({ channel: '1', sid: '1395259' }, (err, data) => {
        if (err) throw err
        expect(data).to.be.an('array')
        done()
      })
    })
  })

  describe('#personal_channel()', () => {
    it('it should return an array', (done) => {
      sdk.personal_channel({}, (err, data) => {
        if (err) throw err
        expect(data).to.be.an('array')
        done()
      })
    })
  })

  describe('#personal_like_channel()', () => {
    it('it should return an array', (done) => {
      sdk.personal_like_channel({}, (err, data) => {
        if (err) throw err
        expect(data).to.be.an('array')
        done()
      })
    })
  })

})
