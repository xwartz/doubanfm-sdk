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

  describe('#star()', () => {
    it('it should return an array', (done) => {
      sdk.star({ channel: '1', sid: '1395259' }, (err, data) => {
        if (err) throw err
        expect(data).to.be.a('array')
        done()
      })
    })
  })

  describe('#unstar()', () => {
    it('it should return an array', (done) => {
      sdk.unstar({ channel: '1', sid: '1395259' }, (err, data) => {
        if (err) throw err
        expect(data).to.be.a('array')
        done()
      })
    })
  })

  describe('#never_play_again()', () => {
    it('it should return an array', (done) => {
      sdk.never_play_again({ channel: '1', sid: '1395259' }, (err, data) => {
        if (err) throw err
        expect(data).to.be.a('array')
        done()
      })
    })
  })

})
