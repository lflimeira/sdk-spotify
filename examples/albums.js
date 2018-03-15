/* to run: babel-node albums.js */
global.fetch = require('node-fetch')

import SpotifyWrapper from '../src/index'

const spotify = new SpotifyWrapper({
  token: 'BQAfwkvX1S9GQACQTMusUqG9RUg-egTC2Bj7Q3C3RnNqzH5oWJxL_xNR5hx9H4L5-2IMeKRYxFPOjPG1wD--sHHZZfvVywnrDzk_qhUno4JAgc8ULEPSsGwzc5WkmxHI6aNde2cAidQZBzXp'
})

const albums = spotify.search.searchAlbums('Incubus')

albums.then(data => data.albums.items.map(item => console.log(item.name)))
