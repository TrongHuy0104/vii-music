import React, { createContext, useContext } from 'react';
import TrackPlayer from 'react-native-track-player';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const playAudio = async (track) => {
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: track.encodeId,
        url: track.audioUrl,
        title: track.title,
        artist: track.artistsNames,
        artwork: track.thumbnailUri || 'default-thumbnail-url',
      });
      await TrackPlayer.play();
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  return (
    <AudioContext.Provider value={{ playAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
