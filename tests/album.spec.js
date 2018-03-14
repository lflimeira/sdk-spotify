import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'
sinonStubPromise(sinon)

chai.use(sinonChai)

global.fetch = require('node-fetch')

import SpotifyWrapper from '../src/index'

describe('Album', () => {
  let spotify
  let stubedFetch
  let promise

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo'
    })

    stubedFetch = sinon.stub(global, 'fetch')  
    promise = stubedFetch.returnsPromise()
  })

  afterEach(() => {
    stubedFetch.restore()
  })

  describe('smoke tests', () => {
    
    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist
    })
  
    it('should have getAlbums method', () => {
      expect(spotify.album.getAlbums).to.exist
    })

    it('should have getAlbumTracks method', () => {
      expect(spotify.album.getAlbumTracks).to.exist
    })

  })

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = spotify.album.getAlbum()
      expect(stubedFetch).to.have.been.calledOnce
    }) 
    
    it('should call fetch with the correct URL', () => {
      const album = spotify.album.getAlbum('2i6nd4FV6y7K9fln6eelmR')
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/2i6nd4FV6y7K9fln6eelmR')

      const album2 = spotify.album.getAlbum('2i6nd4FV6y7K9fln6eelmK')
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/2i6nd4FV6y7K9fln6eelmK')
    }) 

    it('should return the correct data from Promise', () => {
      promise.resolves({album: 'name'})
      const album = spotify.album.getAlbum('2i6nd4FV6y7K9fln6eelmR')
      expect(album.resolveValue).to.be.eql({album: 'name'})
    })
  })

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = spotify.album.getAlbums()
      expect(stubedFetch).to.have.been.calledOnce
    })
    
    it('should call fetch with the correct URL', () => {
      const albums = spotify.album.getAlbums(['2i6nd4FV6y7K9fln6eelmR', '6peEdPVO73WtgGah5sEhX4'])
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums?ids=2i6nd4FV6y7K9fln6eelmR,6peEdPVO73WtgGah5sEhX4')
    })
    
    it('should return the correct data from Promise', () => {
      promise.resolves({album: 'name'})
      const albums = spotify.album.getAlbums(['2i6nd4FV6y7K9fln6eelmR', '6peEdPVO73WtgGah5sEhX4'])
      expect(albums.resolveValue).to.have.eql({album: 'name'})
    })
  })
  
  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      const tracks = spotify.album.getAlbumTracks()
      expect(stubedFetch).to.have.been.calledOnce
    })
    
    it('should call fetch with the correct URL', () => {
      const tracks = spotify.album.getAlbumTracks('2i6nd4FV6y7K9fln6eelmR')
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/2i6nd4FV6y7K9fln6eelmR/tracks')
    })
    
    it('should return the correct data from Promise', () => {
      promise.resolves({album: 'name'})
      const tracks = spotify.album.getAlbumTracks('2i6nd4FV6y7K9fln6eelmR')
      expect(tracks.resolveValue).to.have.eql({album: 'name'})
    })
  })
})
