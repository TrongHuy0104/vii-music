// import React, { useEffect, useState } from 'react';
// import { Text, View } from 'react-native';
// // import { getDownloadedSongs } from '../services/downloadManager' // Hàm để lấy danh sách bài hát đã tải
// import TrackList from '../../components/TrackList';
// import { defaultStyles } from '../../styles';

// import * as FileSystem from 'expo-file-system'; // Ensure proper import of FileSystem


// export default function DownloadedSongsList() {
//   const [downloadedSongs, setDownloadedSongs] = useState([])

//   useEffect(() => {
//     // Function to load downloaded songs from the file system
//     const loadDownloadedSongs = async () => {
//       try {
//         // Get the list of downloaded files in the directory
//         const fileList = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)

//         // Filter only .mp3 files (or any specific format you have)
//         const songFiles = fileList.filter(file => file.endsWith('.mp3'))

//         // Map these files to song objects
//         const songs = songFiles.map((file, index) => ({
//           encodeId: `downloaded-${index}`, // Assign a unique ID for each song
//           title: file.replace('.mp3', ''), // Extract song title
//           audioUrl: FileSystem.documentDirectory + file, // Construct the full path
//           thumbnailM: null, // Placeholder if you don't have thumbnail data
//         }))
//         console.log(songs);

//         setDownloadedSongs(songs) // Set the songs to state
//       } catch (error) {
//         console.error('Error loading downloaded songs:', error)
//       }
//     }

//     loadDownloadedSongs() // Load songs on component mount
//   }, [])

//   if (downloadedSongs.length === 0) {
//     return (
//       <View style={[defaultStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
//         <Text>No downloaded songs found.</Text>
//       </View>
//     )
//   }

//   return (
//     <View style={defaultStyles.container}>
//       {/* Use TrackList to display the list of downloaded songs */}
//       <TrackList songs={downloadedSongs} />
//     </View>
//   )
// }
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import TrackList from '../../components/TrackList';
import { defaultStyles } from '../../styles';

export default function DownloadedSongsList() {
  const [downloadedSongs, setDownloadedSongs] = useState([]);

  useEffect(() => {
    // Function to load downloaded songs from the file system
    const loadDownloadedSongs = async () => {
      try {
        // Get the list of downloaded files in the directory
        const fileList = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);

        // Filter only .mp3 files (or any specific format you have)
        const songFiles = fileList.filter(file => file.endsWith('.mp3'));

        // Map these files to song objects
        const songs = songFiles.map((file, index) => ({
          encodeId: `downloaded-${index}`, // Assign a unique ID for each song
          title: file.replace('.mp3', ''), // Extract song title
          audioUrl: FileSystem.documentDirectory + file, // Construct the full path
          thumbnailM: null, // Placeholder if you don't have thumbnail data
        }));

        console.log(songs);
        setDownloadedSongs(songs); // Set the songs to state
      } catch (error) {
        console.error('Error loading downloaded songs:', error);
      }
    };

    loadDownloadedSongs(); // Load songs on component mount
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
      {/* Use TrackList to display the list of downloaded songs */}
      <TrackList songs={downloadedSongs} />
    </View>
  );
}
