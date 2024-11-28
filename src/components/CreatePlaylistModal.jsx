import React, { useState } from 'react'
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { colors, fontSize, fontWeight } from '../constants/tokens'
import { createPlaylist } from '../api/apiPlaylist'

const CreatePlaylistModal = ({ visible, onClose }) => {
  const [playlistName, setPlaylistName] = useState('')

  const handleCreate = () => {
    if (playlistName.trim()) {
      createPlaylist({ title: playlistName }) // Gọi hàm tạo playlist
      setPlaylistName('')
      onClose()
    }
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
          <TextInput
            style={styles.input}
            placeholder="Tên playlist"
            value={playlistName}
            onChangeText={setPlaylistName}
            placeholderTextColor={colors.minimumTrackTintColor}
          />
          <TouchableOpacity
            style={[styles.createButton, { backgroundColor: playlistName.trim() ? colors.primary : '#ddd' }]}
            onPress={handleCreate}
            disabled={!playlistName.trim()}
          >
            <Text style={[styles.createButtonText, { color: playlistName.trim() ? 'white' : 'gray' }]}>
              TẠO PLAYLIST
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.minimumTrackTintColor,
    borderRadius: 5,
    marginBottom: 20,
    color: colors.text,
  },
  createButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
  },
})

export default CreatePlaylistModal
