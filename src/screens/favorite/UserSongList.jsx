
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { getSongsInPlaylist, getSongDetails } from '../../api/apiPlaylist';
import TrackList from '../../components/TrackList';
import Heading from '../../components/Heading';
import { defaultStyles } from '../../styles';
import PlaylistThumb from '../../components/PlaylistThumb';
import { unknownTrackImageUri } from '../../constants/images';

// export default function UserSongList({ route }) {
//   const { playlistId } = route.params; // Get playlistId from route params
//   const [songs, setSongs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSongs = async () => {
//       try {
//         const songIds = await getSongsInPlaylist(playlistId);
//         if (songIds.length > 0) {
//           const songDetails = await getSongDetails(songIds);
//           setSongs(songDetails);
//         }
//       } catch (error) {
//         console.error('Error loading songs:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSongs();
//   }, [playlistId]);

//   const getThumbnailImages = (songs) => {
//     const images = songs.slice(0, 4).map(song => song.thumbnailM || unknownTrackImageUri)
//     while (images.length < 4) {
//       images.push(unknownTrackImageUri)
//     }
//     return images
//   }

//   if (loading) {
//     return (
//       <View style={defaultStyles.container}>
//         <ActivityIndicator size="large" />
//         <Text>Loading songs...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={defaultStyles.container}>
//       <Heading title="Danh Sách Bài Hát" />
//       <PlaylistThumb
// 					thumbnail={getThumbnailImages(songs)}
// 					numSongs={songs.length}
// 					// duration={songs}
// 				/>
//       <TrackList songs={songs} />
//     </View>
//   );
// }
// import React, { useEffect, useState } from 'react'
// import { View, Text, ActivityIndicator } from 'react-native'
// import { getSongsInPlaylist, getSongDetails } from '../../api/apiPlaylist'
// import TrackList from '../../components/TrackList'
// import Heading from '../../components/Heading'
// import { defaultStyles } from '../../styles'
// import PlaylistThumb from '../../components/PlaylistThumb'

export default function UserSongList({ route }) {
  const { playlistId } = route.params
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songIds = await getSongsInPlaylist(playlistId)
        if (songIds.length > 0) {
          const songDetails = await getSongDetails(songIds)
          setSongs(songDetails)
        }
      } catch (error) {
        console.error('Error loading songs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSongs()
  }, [playlistId])

  const getThumbnailImages = (songs) => {
    const images = songs.slice(0, 4).map(song => song.thumbnailM || unknownTrackImageUri)
    while (images.length < 4) {
      images.push(unknownTrackImageUri)
    }
    return images
  }

  if (loading) {
    return (
      <View style={defaultStyles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading songs...</Text>
      </View>
    )
  }

  return (
    <View style={defaultStyles.container}>
      <Heading title="Danh Sách Bài Hát" />
      <PlaylistThumb
        thumbnails={getThumbnailImages(songs)}
        numSongs={songs.length}
        duration={songs.reduce((acc, song) => acc + song.duration, 0)} // Summing the duration of all songs
      />
      <TrackList songs={songs} />
    </View>
  )
}
