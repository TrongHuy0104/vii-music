import React, { useState } from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { colors, fontSize, fontWeight } from '../constants/tokens'
import CreatePlaylistModal from './CreatePlaylistModal' // Import component CreatePlaylistModal
import UserPlaylist from './UserPlaylist' // Import component UserPlaylist

const FavoritePlaylistModal = ({ visible, onClose, onCreatePlaylist, onAddSongToPlaylist }) => {
  const [isCreateModalVisible, setCreateModalVisible] = useState(false)

  const openCreatePlaylistModal = () => {
    setCreateModalVisible(true)
  }

  const closeCreatePlaylistModal = () => {
    setCreateModalVisible(false)
  }

  const handleSelectPlaylist = (playlist) => {
    // add song to playlist
    onAddSongToPlaylist(playlist)
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={onClose}>
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Thêm bài hát vào playlist</Text>
          
          {/* New Playlist Create Button */}
          <TouchableOpacity style={styles.createPlaylistButton} onPress={openCreatePlaylistModal}>
            <View style={styles.iconContainer}>
              <Text style={styles.plusIcon}>+</Text>
            </View>
            <Text style={styles.createPlaylistText}>Tạo playlist mới</Text>
          </TouchableOpacity>

          {/* Playlist list */}
          <View style={styles.playlistContainer}>
            <UserPlaylist onSelectPlaylist={handleSelectPlaylist} />
          </View>

          {/* Modal Create Playlist */}
          <CreatePlaylistModal
            visible={isCreateModalVisible}
            onClose={closeCreatePlaylistModal}
            onCreate={onCreatePlaylist} // add new playlist function
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: 20,
    color: colors.text,
  },
  createPlaylistButton: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    width: '100%',
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  plusIcon: {
    fontSize: 24,
    color: 'white',
  },
  createPlaylistText: {
    fontSize: fontSize.base,
    marginLeft: 10,
    color: colors.text,
  },
  playlistContainer: {
    flex:5,
    width: '100%',
    height: '50%',
  },
  playlistItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  playlistText: {
    fontSize: fontSize.base,
    color: colors.text,
  },
})

export default FavoritePlaylistModal
