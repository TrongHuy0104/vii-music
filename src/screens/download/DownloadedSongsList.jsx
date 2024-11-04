// import * as FileSystem from 'expo-file-system';
// import React, { useEffect, useState } from 'react';
// import { PermissionsAndroid, Platform, Text, View } from 'react-native';
// import { defaultStyles } from '../../styles';
// import { downloadEventEmitter } from '../../utils/eventEmitter';
// import DownloadList from './DownloadList';

// export default function DownloadedSongsList() {
//   const [downloadedSongs, setDownloadedSongs] = useState([]);
//   const [refreshKey, setRefreshKey] = useState(0); // State to trigger re-render

//   const requestToPermissions = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           {
//             title: 'Storage Permission',
//             message: 'App needs access to your storage to download files.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('Permission granted');
//         } else {
//           console.log('Permission denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     }
//   };

//   const loadDownloadedSongs = async () => {
//     try {
//       // Lấy danh sách các file trong thư mục
//       const fileList = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
//       console.log('File list:', fileList); // In danh sách file để kiểm tra

//       // Lọc các file .json
//       const jsonFiles = fileList.filter(file => file.endsWith('.json'));

//       const songs = [];
//       for (const file of jsonFiles) {
//         try {
//           const metadata = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + file);
//           const songData = JSON.parse(metadata);
//           console.log('Loaded song data:', songData); // In dữ liệu bài hát để kiểm tra

//           // Kiểm tra xem file audio có tồn tại không
//           const audioFileInfo = await FileSystem.getInfoAsync(songData.audioUrl);
//           console.log('Audio file info:', audioFileInfo);
//           if (!audioFileInfo.exists) {
//             console.error('Audio file does not exist or path is incorrect:', songData.audioUrl);
//             continue;
//           }

//           songs.push(songData);
//         } catch (error) {
//           console.error('Error reading file:', file, error); // Thêm log chi tiết khi đọc file lỗi
//         }
//       }

//       setDownloadedSongs(songs);
//     } catch (error) {
//       console.error('Error loading downloaded songs:', error);
//     }
//   };

//   useEffect(() => {
//     requestToPermissions(); // Request permissions when component mounts
//     loadDownloadedSongs(); // Initial load

//     // Listen for download completion events
//     const handleDownloadComplete = () => {
//       console.log('Download complete event received'); // Log to confirm event reception
//       loadDownloadedSongs();
//       setRefreshKey(prevKey => prevKey + 1); // Trigger re-render
//     };

//     downloadEventEmitter.on('downloadComplete', handleDownloadComplete);

//     // Cleanup listener on unmount
//     return () => {
//       downloadEventEmitter.off('downloadComplete', handleDownloadComplete);
//     };
//   }, [refreshKey]); // Add `refreshKey` as a dependency to trigger re-render

//   if (downloadedSongs.length === 0) {
//     return (
//       <View style={[defaultStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
//         <Text>No downloaded songs found.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={defaultStyles.container}>
//       <DownloadList songs={downloadedSongs} />
//     </View>
//   );
// }

// import * as FileSystem from 'expo-file-system';
// import React, { useEffect, useRef, useState } from 'react';
// import { FlatList, PermissionsAndroid, Platform, Text, TouchableOpacity, View } from 'react-native';
// import TrackPlayer from 'react-native-track-player';
// import { defaultStyles } from '../../styles';
// import { downloadEventEmitter } from '../../utils/eventEmitter';
// import DownloadListItem from './DownloadListItem'; // Import the item component

// export default function DownloadedSongsList() {
//   const [downloadedSongs, setDownloadedSongs] = useState([]);
//   const [currentSongIndex, setCurrentSongIndex] = useState(0);
//   const queueOffset = useRef(0);
//   const songsLength = useRef(0);

//   const requestToPermissions = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           {
//             title: 'Storage Permission',
//             message: 'App needs access to your storage to download files.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('Permission denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     }
//   };

//   const loadDownloadedSongs = async () => {
//     try {
//       const fileList = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
//       console.log('File list:', fileList);

//       const jsonFiles = fileList.filter(file => file.endsWith('.json'));

//       const songs = [];
//       for (const file of jsonFiles) {
//         try {
//           const metadata = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + file);
//           const songData = JSON.parse(metadata);
//           console.log('Loaded song data:', songData);

//           const audioFileInfo = await FileSystem.getInfoAsync(songData.audioUrl);
//           if (!audioFileInfo.exists) {
//             console.error('Audio file does not exist or path is incorrect:', songData.audioUrl);
//             continue;
//           }

//           songs.push(songData);
//         } catch (error) {
//           console.error('Error reading file:', file, error);
//         }
//       }

//       setDownloadedSongs(songs);
//     } catch (error) {
//       console.error('Error loading downloaded songs:', error);
//     }
//   };

//   const handleTrackSelect = async (selectedTrackIndex) => {
//     try {
//       const song = downloadedSongs[selectedTrackIndex];
//       if (!song) return;

//       await TrackPlayer.reset();
//       await TrackPlayer.add(downloadedSongs.map((track, index) => ({
//         id: index.toString(),
//         url: track.audioUrl,
//         title: track.title,
//         artist: track.artistsNames,
//         artwork: track.thumbnailUri,
//       })));
//       await TrackPlayer.skip(selectedTrackIndex);
//       await TrackPlayer.play();

//       setCurrentSongIndex(selectedTrackIndex);
//     } catch (error) {
//       console.error('Error playing song:', error);
//     }
//   };

//   useEffect(() => {
//     requestToPermissions();
//     loadDownloadedSongs();

//     const handleDownloadComplete = () => {
//       console.log('Download complete event received');
//       loadDownloadedSongs();
//     };

//     downloadEventEmitter.on('downloadComplete', handleDownloadComplete);

//     return () => {
//       downloadEventEmitter.off('downloadComplete', handleDownloadComplete);
//     };
//   }, []);

//   if (downloadedSongs.length === 0) {
//     return (
//       <View style={[defaultStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
//         <Text>No downloaded songs found.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={defaultStyles.container}>
//       <FlatList
//         data={downloadedSongs}
//         renderItem={({ item, index }) => (
//           <DownloadListItem track={item} onTrackSelect={() => handleTrackSelect(index)} />
//         )}
//         keyExtractor={(item, index) => index.toString()}
//         contentContainerStyle={{ paddingTop: 10, paddingBottom: 60 }}
//       />
//       {/* Add buttons for skipping songs */}
//       <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
//         <TouchableOpacity onPress={() => handleTrackSelect((currentSongIndex - 1 + downloadedSongs.length) % downloadedSongs.length)} style={{ padding: 10 }}>
//           <Text style={{ color: 'blue' }}>Previous</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => TrackPlayer.play()} style={{ padding: 10 }}>
//           <Text style={{ color: 'green' }}>Play</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => handleTrackSelect((currentSongIndex + 1) % downloadedSongs.length)} style={{ padding: 10 }}>
//           <Text style={{ color: 'blue' }}>Next</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }





import * as FileSystem from 'expo-file-system';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, PermissionsAndroid, Platform, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import TrackPlayer from 'react-native-track-player';
import { defaultStyles } from '../../styles';
import { downloadEventEmitter } from '../../utils/eventEmitter';
import DownloadListItem from './DownloadListItem'; // Import the item component

export default function DownloadedSongsList() {
  const [downloadedSongs, setDownloadedSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const queueOffset = useRef(0);
  const songsLength = useRef(0);

  const requestToPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to download files.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const loadDownloadedSongs = async () => {
    try {
      const fileList = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
      console.log('File list:', fileList);

      const jsonFiles = fileList.filter(file => file.endsWith('.json'));

      const songs = [];
      for (const file of jsonFiles) {
        try {
          const metadata = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + file);
          const songData = JSON.parse(metadata);
          console.log('Loaded song data:', songData);

          const audioFileInfo = await FileSystem.getInfoAsync(songData.audioUrl);
          if (!audioFileInfo.exists) {
            console.error('Audio file does not exist or path is incorrect:', songData.audioUrl);
            continue;
          }

          songs.push(songData);
        } catch (error) {
          console.error('Error reading file:', file, error);
        }
      }

      setDownloadedSongs(songs);
    } catch (error) {
      console.error('Error loading downloaded songs:', error);
    }
  };

  

  useEffect(() => {
    requestToPermissions();
    loadDownloadedSongs();

    const handleDownloadComplete = () => {
      console.log('Download complete event received');
      loadDownloadedSongs();
    };

    downloadEventEmitter.on('downloadComplete', handleDownloadComplete);

    return () => {
      downloadEventEmitter.off('downloadComplete', handleDownloadComplete);
    };
  }, []);

  if (downloadedSongs.length === 0) {
    return (
      <View style={[defaultStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>No downloaded songs found.</Text>
      </View>
    );
  }

  return (
    <View style={defaultStyles.container}>
      <FlatList
        data={downloadedSongs}
        renderItem={({ item, index }) => (
          <DownloadListItem track={item} onTrackSelect={() => handleTrackSelect(index)} />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 60 }}
      />
    </View>
  );
}