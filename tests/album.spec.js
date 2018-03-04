import chai, { expect } from 'chai'
import { getAlbum, getAlbums, getAlbumTracks } from '../src/album'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'
sinonStubPromise(sinon)

chai.use(sinonChai)

global.fetch = require('node-fetch')

describe('Album', () => {
  let stubedFetch
  let promise

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch')  
    promise = stubedFetch.returnsPromise()
  })

  afterEach(() => {
    stubedFetch.restore()
  })

  describe('smoke tests', () => {
    
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist
    })
  
    it('should have getAlbums method', () => {
      expect(getAlbums).to.exist
    })

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist
    })

  })

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = getAlbum()
      expect(stubedFetch).to.have.been.calledOnce
    }) 
    
    it('should call fetch with the correct URL', () => {
      const album = getAlbum('2i6nd4FV6y7K9fln6eelmR')
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/2i6nd4FV6y7K9fln6eelmR')

      const album2 = getAlbum('2i6nd4FV6y7K9fln6eelmK')
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/2i6nd4FV6y7K9fln6eelmK')
    }) 

    it('should return the correct data from Promise', () => {
      promise.resolves({album: 'name'})
      const album = getAlbum('2i6nd4FV6y7K9fln6eelmR')
      expect(album.resolveValue).to.be.eql({album: 'name'})
    })
  })

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = getAlbums()
      expect(stubedFetch).to.have.been.calledOnce
    })
    
    it('should call fetch with the correct URL', () => {
      const albums = getAlbums(['2i6nd4FV6y7K9fln6eelmR', '6peEdPVO73WtgGah5sEhX4'])
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums?ids=2i6nd4FV6y7K9fln6eelmR,6peEdPVO73WtgGah5sEhX4')
    })
    
    it('should return the correct data from Promise', () => {
      promise.resolves({album: 'name'})
      const albums = getAlbums(['2i6nd4FV6y7K9fln6eelmR', '6peEdPVO73WtgGah5sEhX4'])
      expect(albums.resolveValue).to.have.eql({album: 'name'})
    })
  })
  
  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      const tracks = getAlbumTracks()
      expect(stubedFetch).to.have.been.calledOnce
    })
    
    it('should call fetch with the correct URL', () => {
      const tracks = getAlbumTracks('2i6nd4FV6y7K9fln6eelmR')
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/2i6nd4FV6y7K9fln6eelmR/tracks')
    })
    
    it('should return the correct data from Promise', () => {
      promise.resolves({album: 'name'})
      const tracks = getAlbumTracks('2i6nd4FV6y7K9fln6eelmR')
      expect(tracks.resolveValue).to.have.eql({album: 'name'})
    })
  })
})
