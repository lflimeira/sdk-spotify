import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'
import { API_URL } from '../src/config'
chai.use(sinonChai)
sinonStubPromise(sinon)

global.fetch = require('node-fetch')

import SpotifyWrapper from '../src/index'

describe('Search', () => {
  let spotify
  let fetchedStub
  let promise

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo'
    })

    fetchedStub = sinon.stub(global, 'fetch')
    promise = fetchedStub.returnsPromise()
  })

  afterEach(() => {
    fetchedStub.restore()
  })

  describe('smoke tests', () => {
    
    it('should exist the spotify.search.searchAlbums method', () => {
      expect(spotify.search.searchAlbums).to.exist
    })
    
    it('should exist the spotify.search.searchArtists method', () => {
      expect(spotify.search.searchArtists).to.exist
    })
    
    it('should exist the spotify.search.searchTracks method', () => {
      expect(spotify.search.searchTracks).to.exist
    })
    
    it('should exist the spotify.search.searchPlaylists method', () => {
      expect(spotify.search.searchPlaylists).to.exist
    })
  })

  describe('spotify.search.searchArtists', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.searchArtists('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const artists = spotify.search.searchArtists('Incubus')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Incubus&type=artist`)

      const artists2 = spotify.search.searchArtists('Muse')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Muse&type=artist`)
    })
  })

  describe('spotify.search.searchAlbums', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.searchAlbums('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const albums = spotify.search.searchAlbums('Incubus')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Incubus&type=album`)

      const albums2 = spotify.search.searchAlbums('Muse')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Muse&type=album`)
    })
  })
  
  describe('spotify.search.searchTracks', () => {
    it('should call fetch function', () => {
      const tracks = spotify.search.searchTracks('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const tracks = spotify.search.searchTracks('Incubus')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Incubus&type=track`)

      const tracks2 = spotify.search.searchTracks('Muse')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Muse&type=track`)
    })
  })
  
  describe('spotify.search.searchPlaylists', () => {
    it('should call fetch function', () => {
      const playlist = spotify.search.searchPlaylists('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const playlist = spotify.search.searchPlaylists('Incubus')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Incubus&type=playlist`)

      const playlist2 = spotify.search.searchPlaylists('Muse')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Muse&type=playlist`)
    })
  })
})
