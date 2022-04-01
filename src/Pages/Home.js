import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards';
import SearchBar from '../components/SearchBtn';
import config from '../lib/config';
import Button from '../components/Button';

export default function Home() {
  const [accessToken, setAccessToken] = useState('');
  const [isAuthorize, setIsAuthorize] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCardsUri, setSelectedCardsUri] = useState([]);
  const [isInSearch, setIsInSearch] = useState(false);

  useEffect(() => {
    const accessToken = new URLSearchParams(window.location.hash).get('#access_token');

    setAccessToken(accessToken);
    setIsAuthorize(accessToken !== null);
  }, []);

  useEffect(() => {
    if (!isInSearch) {
      const selectedCards = filterSelectedCards();

      setCards(selectedCards);
    }
  }, [selectedCardsUri]);

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  }

  const filterSelectedCards = () => {
    return cards.filter((track) => selectedCardsUri.includes(track.uri));
  }

  const onSuccessSearch = (searchCards) => {
    setIsInSearch(true);
    const selectedCards = filterSelectedCards();
    const searchDistincCards = searchCards.filter((cards) => !selectedCardsUri.includes(cards.uri));

    setCards([...selectedCards, ...searchDistincCards]);
  }


  const clearSearch = () => {
    const selectedCards = filterSelectedCards();
    
    setCards(selectedCards);
    setIsInSearch(false);
  }


  const toggleSelect = (track) => {
    const uri = track.uri;

    if (selectedCardsUri.includes(uri)) {
      setSelectedCardsUri(selectedCardsUri.filter((item) => item !== uri));
    } else {
      setSelectedCardsUri([...selectedCardsUri, uri]);
    }
  }

  return (
    <>
      {!isAuthorize && (
        <main className="center">
          <img src="https://media.giphy.com/media/fsc7c7TYKulQ4lmmAo/giphy.gif" alt="" />
          <h2>Authorize first please🙏</h2>
          <Button href={getSpotifyLinkAuthorize()}>Authorize</Button>
        </main>
      )}

      {isAuthorize && (
        <main className="container" id="home">
          <SearchBar
            accessToken={accessToken}
            onSuccess={(cards) => onSuccessSearch(cards)}
            onClearSearch={clearSearch}
          />

          <div className="content">
            {cards.length === 0 && (
              <p>No Song</p>
            )}

            <div className="cards">
              {cards.map((cards) => (
                <Cards
                  key={cards.id}
                  imageUrl={cards.album.images[0].url}
                  title={cards.name}
                  artist={cards.artists[0].name}
                  toggleSelect={() => toggleSelect(cards)}
                />
              ))}
            </div>
          </div>
        </main>
      )}
    </>
  );
}
