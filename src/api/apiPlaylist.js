import { supabase } from '../utils/supabase'
import Toast from 'react-native-toast-message'
import { getCurrentUser } from './apiAuth'

// Func get userId from authId
const getUserIdFromAuthId = async (authId) => {
  const { data, error } = await supabase
    .from('User')
    .select('id')
    .eq('authId', authId)

  if (error || data.length === 0) {
    console.error('Error fetching userId:', error)
    return null
  }
  return data[0].id
}

// Function to add a song to the Song table if it doesn't already exist
const addSongIfNotExists = async (songData) => {
  // Check if the song already exists based on encodeId or song title
  const { data: existingSong, error: checkError } = await supabase
    .from('Song')
    .select('id')
    .eq('encodeId', songData.encodeId)
    .limit(1)

  if (checkError) {
    console.error('Lỗi khi kiểm tra bài hát:', checkError.message)
    return null
  }

  // If the song already exists, return the id of the song
  if (existingSong && existingSong.length > 0) {
    return existingSong[0].id
  }

  // If the song doesn't exist, insert the new song into the Song table
  const { data: newSong, error: insertError } = await supabase
    .from('Song')
    .insert([
      {
        title: songData.title,
        artistsNames: songData.artistsNames,
        thumbnailM: songData.thumbnailM,
        duration: songData.duration,
        streamingStatus: songData.streamingStatus,
        encodeId: songData.encodeId,
        src: songData.src,
      }
    ])
    .select('id') /// Return only the id of the newly inserted song

  if (insertError) {
    console.error('Lỗi khi thêm bài hát mới:', insertError.message)
    return null
  }

  return newSong[0].id
}

export async function addSongToPlaylist(song, playlistId) {
  try {
    // Step 1: Check if the song already exists in the 'Song' table
    const { data: existingSong, error: songCheckError } = await supabase
      .from('Song')
      .select('id')
      .eq('encodeId', song.encodeId)
      .single();  // Ensure we get only one record

    let songId;

    if (songCheckError || !existingSong) {
      // Step 2: If the song doesn't exist, insert it into the 'Song' table
      const { data: newSong, error: addSongError } = await supabase
        .from('Song')
        .insert([{
          title: song.title,
          artistsNames: song.artistsNames,
          thumbnailM: song.thumbnailM,
          duration: song.duration,
          streamingStatus: song.streamingStatus,
          encodeId: song.encodeId,
          url: song.url,
        }])
        .select()  // Return the newly inserted record
        .single(); // Ensure only one record is returned

      if (addSongError) {
        // Show error toast if adding the song fails
        Toast.show({
          type: 'error',
          text1: 'Lỗi',
          text2: 'Thêm bài hát thất bại!',
        });
        console.error('Lỗi khi thêm bài hát:', addSongError.message);
        return;
      }

      // Get songId from the newly inserted song
      songId = newSong.id;
    } else {
      // Step 3: If the song already exists, get the songId
      songId = existingSong.id;
    }

    // Step 4: Check if the song is already in the playlist (Song_Playlist)
    const { data: existingSongInPlaylist, error: checkPlaylistError } = await supabase
      .from('Song_Playlist')
      .select('id')  // Only select id to check existence
      .eq('playlistId', playlistId.id)
      .eq('songId', songId)
      .single();  // Check for a single matching record

    if (checkPlaylistError && checkPlaylistError.code !== 'PGRST116') {
      // Handle other errors besides "not found" (PGRST116 is for missing records)
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Lỗi khi kiểm tra playlist!',
      });
      console.error('Lỗi khi kiểm tra bài hát trong playlist:', checkPlaylistError.message);
      return;
    }

    // Step 5: If the song is already in the playlist, show a message
    if (existingSongInPlaylist) {
      Toast.show({
        type: 'info',
        text1: 'Thông báo',
        text2: 'Bài hát đã có trong Playlist!',
      });
      return;
    }

    // Step 6: If the song is not in the playlist, add it to 'Song_Playlist'
    const { error: addToPlaylistError } = await supabase
      .from('Song_Playlist')
      .insert([{
        playlistId: playlistId.id,  // Use the playlistId from the parameter
        songId: songId,  // Use the songId from the 'Song' table
      }]);

    if (addToPlaylistError) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Không thể thêm bài hát vào playlist!',
      });
      console.error('Lỗi khi thêm bài hát vào playlist:', addToPlaylistError.message);
    } else {
      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Bài hát đã được thêm vào playlist!',
      });
    }
  } catch (error) {
    console.error('Lỗi khi thêm bài hát vào playlist:', error.message);
    Toast.show({
      type: 'error',
      text1: 'Lỗi',
      text2: 'Đã xảy ra lỗi khi thêm bài hát vào playlist!',
    });
  }
}

//Func add a new playlist
export async function createPlaylist(playlistData) {

  try {
    const user = await getCurrentUser()
    if (!user) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Không tìm thấy thông tin người dùng!',
      })
      return
    }
    const userId = await getUserIdFromAuthId(user.id);
    const { error } = await supabase
      .from('Playlist')
      .insert([
        {
          title: playlistData.title,
          thumbnail: playlistData.thumbnail,
          artistsNames: playlistData.artistsNames,
          userId: userId,
          encodeId: playlistData.encodeId,
        }
      ])

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Tạo playlist thất bại!',
      })
      console.error('Lỗi khi tạo playlist:', error.message)
    } else {
      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Playlist đã được tạo thành công!',
      })
      console.log('Playlist đã được tạo thành công!')
    }
  } catch (error) {
    console.error('Lỗi khi lấy thông tin người dùng:', error.message)
    Toast.show({
      type: 'error',
      text1: 'Lỗi',
      text2: 'Không thể tạo playlist do lỗi xác thực!',
    })
  }
}

// Function to get playlists of the current user
export async function getUserPlaylists() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Không tìm thấy thông tin người dùng!',
      })
      return null
    }
    const userId = await getUserIdFromAuthId(user.id);

    if (!userId) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Không thể lấy userId!',
      })
      return null
    }

    const { data, error } = await supabase
      .from('Playlist')
      .select('*')
      .eq('userId', userId)
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Không thể lấy playlist!',
      })
      console.error('Lỗi khi lấy playlist:', error.message)
      return null
    }

    return data
  } catch (error) {
    console.error('Lỗi khi lấy playlist của người dùng:', error.message)
    Toast.show({
      type: 'error',
      text1: 'Lỗi',
      text2: 'Đã xảy ra lỗi khi lấy playlist!',
    })
    return null
  }
}

// Function to get song IDs from a playlist
export async function getSongsInPlaylist(playlistId) {
  try {
    // Query Song_Playlist to get all song IDs associated with the playlistId
    const { data, error } = await supabase
      .from('Song_Playlist')
      .select('songId')
      .eq('playlistId', playlistId);

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Could not fetch songs from playlist!',
      });
      console.error('Error fetching songs from playlist:', error.message);
      return [];
    }

    // Extract song IDs from the data
    const songIds = data.map((entry) => entry.songId);
    return songIds;

  } catch (error) {
    console.error('Error fetching songs from playlist:', error.message);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'An error occurred while fetching songs from the playlist!',
    });
    return [];
  }
}

// Function to get song details using a list of song IDs
export async function getSongDetails(songIds) {
  try {
    // Query the Song table to get the details of the songs using the song IDs
    const { data, error } = await supabase
      .from('Song')
      .select('*')
      .in('id', songIds);  // Use the 'in' operator to get all matching songs

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Could not fetch song details!',
      });
      console.error('Error fetching song details:', error.message);
      return [];
    }

    return data;

  } catch (error) {
    console.error('Error fetching song details:', error.message);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'An error occurred while fetching song details!',
    });
    return [];
  }
}
