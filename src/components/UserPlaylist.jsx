import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getUserPlaylists, getSongsInPlaylist, getSongDetails } from '../api/apiPlaylist'
import { colors, fontSize, fontWeight } from '../constants/tokens'
import { unknownTrackImageUri } from '../constants/images'

const UserPlaylist = ({ onSelectPlaylist }) => {
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [playlistThumbnails, setPlaylistThumbnails] = useState({})

  useEffect(() => {
    const fetchPlaylists = async () => {
      const data = await getUserPlaylists()

      if (data) {
        setPlaylists(data)

        // Fetch song thumbnails for each playlist
        const thumbnails = {}
        for (const playlist of data) {
          const songIds = await getSongsInPlaylist(playlist.id)
          const songs = await getSongDetails(songIds)
          thumbnails[playlist.id] = getThumbnailImages(songs)
        }
        setPlaylistThumbnails(thumbnails)
      }
      setLoading(false)
    }

    fetchPlaylists()
  }, [])

  const getThumbnailImages = (songs) => {
    const images = songs.slice(0, 4).map(song => song.thumbnailM || unknownTrackImageUri)
    while (images.length < 4) {
      images.push(unknownTrackImageUri)
    }
    return images
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Đang tải danh sách playlist...</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={playlists}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const thumbnails = playlistThumbnails[item.id] || getThumbnailImages([])

        return (
          <TouchableOpacity
            style={styles.playlistItem}
            onPress={() => onSelectPlaylist(item)}
          >
            <View style={styles.thumbnailContainer}>
              {thumbnails.map((thumbnail, index) => (
                <Image
                  key={index}
                  source={{ uri: thumbnail }}
                  style={[styles.thumbnail, styles[`thumbnail${index}`]]}
                />
              ))}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.playlistText}>{item.title}</Text>
              {item.artistsNames ? (
                <Text style={styles.artistText}>{item.artistsNames}</Text>
              ) : null}
            </View>
          </TouchableOpacity>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistItem: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10, // Add space between items
    // borderRadius: 8, // Rounded corners for each playlist
    // backgroundColor: '#f0f0f0', // Background color of the playlist item
    // shadowColor: '#000', // Shadow for better visual effect
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 3,
    
    
  },
  thumbnailContainer: {
    width: 60,
    height: 60,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 15,
  },
  thumbnail: {
    width: 28,
    height: 28,
    borderRadius: 4, // Slightly rounded images
  },
  // Thumbnail positioning (2x2 grid)
  thumbnail0: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  thumbnail1: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  thumbnail2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  thumbnail3: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.minimumTrackTintColor,
  },
  playlistText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: 5, // Add some space between title and artist
  },
  artistText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
})

export default UserPlaylist
