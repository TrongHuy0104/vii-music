import React from 'react';
import { View } from 'react-native';
import { defaultStyles } from '../../styles';
import Header from '../../components/Header';
import UserPlaylist from '../../components/UserPlaylist';
import Heading from '../../components/Heading';

const FavoritePlaylist = ({ navigation }) => {

  // Function to handle selecting a playlist and navigating to the UserSongList screen
  const handleSelectPlaylist = (playlist) => {
    navigation.navigate('UserSongList', { playlistId: playlist.id });
  };

  return (
    <View style={defaultStyles.container}>
      <Heading title="Danh Sách Playlist" />
      <UserPlaylist onSelectPlaylist={handleSelectPlaylist} />
    </View>
  );
};

export default FavoritePlaylist;
