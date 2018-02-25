import { expect } from 'chai'
import { 
  search, 
  searchAlbuns,
  searchArtists,
  searchTracks,
  searchPlaylists
} from '../src/main'

describe('Spotify Wrapper', () => {

  describe('smoke tests', () => {
    
    it('should exist the search method', () => {
      expect(search).to.exist
    })
    
    it('should exist the searchAlbuns method', () => {
      expect(searchAlbuns).to.exist
    })
    
    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist
    })
    
    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist
    })
    
    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist
    })
  })

})
