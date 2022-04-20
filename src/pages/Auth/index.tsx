import React, { useCallback, useEffect } from 'react';
import ParticlesBg from "particles-bg";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import config from '../../lib/config';
import { useDocumentTitle } from '../../lib/customHooks';
import { getUserProfile } from '../../lib/fetchApi';
import { login } from '../../slice/authSlice';
import { Box, Button, Link, Heading } from '@chakra-ui/react'
import { User } from '../../types/user';
import { useAppDispatch } from '../../store';

const Auth : React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  useDocumentTitle('Auth - Ciputify');

  const setLogin = useCallback(async (accessToken, expiresIn) => {
    try {
      const responseUser: User = await getUserProfile(accessToken);

      dispatch(login({
        accessToken,
        expiredDate: +new Date() + expiresIn * 1000,
        user: responseUser,
      }));

      history.push('/create-playlist');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }, [dispatch, history]);

  useEffect(() => {
    const accessTokenParams: string | null = new URLSearchParams(window.location.hash).get('#access_token');
    const expiresIn: string | null = new URLSearchParams(window.location.hash).get('expires_in');

    if (accessTokenParams !== null) {
      setLogin(accessTokenParams, expiresIn);
    }
  }, [setLogin]);

  const buildSpotifyLinkAuthorize: () => string = () => {
    const state: string = Date.now().toString();
    const clientId: string | undefined = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return 'https://accounts.spotify.com/authorize?' +
      `client_id=${clientId}` +
      '&response_type=token' +
      `&redirect_uri=${config.HOST}` +
      `&state=${state}` +
      `&scope=${config.SPOTIFY_SCOPE}`;
  }

  return (
    <main>
      <Box className="center" gap={2}>
        <img src="https://media.giphy.com/media/fsc7c7TYKulQ4lmmAo/giphy.gif" alt="" />
        <Heading className="authorize">Authorize first please🙏</Heading>
        <Link href={buildSpotifyLinkAuthorize()} _hover={{ textDecoration: 'none' }}>
          <Button>Authorize</Button>
        </Link>
        <ParticlesBg type="thick" bg={true} />
      </Box>
      
    </main>
  )
}

export default Auth;
