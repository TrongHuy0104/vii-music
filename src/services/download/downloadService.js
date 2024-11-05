import * as FileSystem from 'expo-file-system';
import { ToastAndroid } from 'react-native';

const downloadSong = async (songUrl, fileName) => {
  try {
    const downloadResumable = FileSystem.createDownloadResumable(
      songUrl,
      FileSystem.documentDirectory + fileName,
      {},
    );

    const { uri } = await downloadResumable.downloadAsync();
    ToastAndroid.show('Download complete! File saved to: ' + uri, ToastAndroid.LONG);
    console.log('Finished downloading to ', uri);
  } catch (error) {
    console.error('Error downloading song:', error);
    ToastAndroid.show('Error downloading song', ToastAndroid.LONG);
  }
};
