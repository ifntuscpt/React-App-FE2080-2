import { Box, Button, Text, Heading } from '@chakra-ui/react';
import ParticlesBg from "particles-bg";
import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../lib/customHooks';

const NotFound: React.FC = () => {
  useDocumentTitle('Not Found - Ciputify');

  return (
    <Box as="main" className="center" gap={2}>
      <img src="https://www.scdn.co/i/404/record.svg" alt="" />
      <Heading>404s and heartbreaks</Heading>
      <Text>We couldn’t find the page you were looking for. Maybe our FAQ or Community can help?</Text>
      <Link to="/create-playlist">
        <Button>
          GO BACK
        </Button>
      </Link>
      <ParticlesBg type="ball" bg={true} />
    </Box>
  )
}

export default NotFound;
