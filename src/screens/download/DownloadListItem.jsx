import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';

export default function DownloadListItem({ track }) {
    // Function to handle playing audio
    const handlePlayAudio = async () => {
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
            console.error('Error playing audio:', error);
        }
    };

    if (!track || !track.title) {
        console.error('Track data is invalid:', track);
        return (
            <View style={styles.invalidItem}>
                <Text style={styles.errorText}>Invalid track data</Text>
            </View>
        );
    }

    return (
        <TouchableOpacity onPress={handlePlayAudio}>
            <View style={styles.itemContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: track.thumbnailUri || 'default-image-url' }}
                    contentFit="cover"
                />
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.title}>{track.title}</Text>
                    {track.artistsNames && (
                        <Text numberOfLines={1} style={styles.artist}>{track.artistsNames}</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white'
    },
    artist: {
        fontSize: 14,
        color: 'gray',
    },
    invalidItem: {
        padding: 10,
        backgroundColor: 'lightgray',
    },
    errorText: {
        color: 'red',
    },
});
