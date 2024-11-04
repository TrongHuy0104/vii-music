import React from 'react';
import { FlatList } from 'react-native';
import DownloadListItem from './DownloadListItem';

export default function DownloadList({ songs }) {
    return (
        <FlatList
            data={songs}
            renderItem={({ item: track }) => <DownloadListItem track={track} />}
            keyExtractor={(item) => item.encodeId}
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 60 }}
        />
    );
}
