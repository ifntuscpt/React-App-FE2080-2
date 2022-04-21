import React, { useEffect, useState } from 'react'
import ParticlesBg from "particles-bg";
import Track from '../../components/Track';
import SearchBtn from '../../components/SearchBtn';
import CreatePlaylistForm from '../../components/CreatePlaylistForm';
import { useDocumentTitle } from '../../lib/customHooks';
import Layout from '../../components/Layout';
import { Box, Divider, Grid, Text } from '@chakra-ui/react';
import { Track as ITrack } from '../../types/tracks';

type TOnSuccessSearch = (searchTracks: ITrack[], query: string) => void;

const CreatePlaylist: React.FC = () => {
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState<string[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<ITrack[]>([]);
  const [isInSearch, setIsInSearch] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('No Songs');
  useDocumentTitle('Create Playlist - Ciputify');

  useEffect(() => {
    if (!isInSearch) {
      setTracks(selectedTracks);
    }
  }, [selectedTracksUri, selectedTracks, isInSearch]);

  const onSuccessSearch: TOnSuccessSearch = (searchTracks, query) => {
    setIsInSearch(true);

    const selectedSearchTracks: ITrack[] = searchTracks.filter((track: ITrack) => selectedTracksUri.includes(track.uri));

    setTracks((prevState: ITrack[]): ITrack[] => {
      const _tracks: ITrack[] = [...new Set([...selectedSearchTracks, ...searchTracks])];

      if (_tracks.length === 0) {
        setMessage(`No Songs found with query "${query}"`);
      } else {
        setMessage('');
      }

      return _tracks;
    });
  }

  const clearSearch: () => void = () => {
    setTracks(selectedTracks);
    setMessage('No Songs');
    setIsInSearch(false);
  }

  const toggleSelect: (track: ITrack) => void = (track) => {
    const uri: string = track.uri;

    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter((item: string) => item !== uri));
      setSelectedTracks(selectedTracks.filter((item: ITrack) => item.uri !== uri));
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
      setSelectedTracks([...selectedTracks, track]);
    }
  }

  return (
    <Layout>
      <Box as="main" className="container" my={5}>
        <CreatePlaylistForm uriTracks={selectedTracksUri} />

        <Divider variant="dashed" my={10} />

        <SearchBtn
          onSuccess={onSuccessSearch}
          onClearSearch={clearSearch}
        />

        <Box mt={10}>
          {(tracks.length === 0 ? ( 
            <Text>{message}</Text>
          ) : (
            <Grid
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
              gap={5}
            >
              {tracks.map((track) => (
                <Track
                  key={track.id}
                  imageUrl={track.album.images[0].url}
                  title={track.name}
                  artist={track.artists[0].name}
                  select={selectedTracksUri.includes(track.uri)}
                  toggleSelect={() => toggleSelect(track)}
                />
              ))}
            </Grid>
          ))}
        </Box>
        <ParticlesBg type="tadpole" bg={true} />
      </Box>
    </Layout>
  );
}

export default CreatePlaylist;
