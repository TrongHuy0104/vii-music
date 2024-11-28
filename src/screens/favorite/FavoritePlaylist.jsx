import { useNavigation } from '@react-navigation/native';
import React from 'react';
import UserPlaylist from '../../components/UserPlaylist';


const FavoritePlaylist = () => {
  const navigation = useNavigation();
  // Function to handle selecting a playlist and navigating to the PlaylistScreen
  const handleSelectPlaylist = (playlist) => {
    console.log('FavoritePlaylist: ', playlist.id);

    navigation.navigate('UserSongList', { playlistId: playlist.id });
  };

  return (
    <UserPlaylist onSelectPlaylist={handleSelectPlaylist} />
  );
};

export default FavoritePlaylist;
