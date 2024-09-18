import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { useAppContext } from "@/app/appcontext";
import EvilIcons from '@expo/vector-icons/EvilIcons';

export default function SearchBox() {
    const { search, setSearch, theme } = useAppContext();

    return (
        <View style={[styles.container, theme.searchBoxBackgroundColor]}>
            <EvilIcons name="search" size={40} color="black" />
            <TextInput
                style={[styles.searchBox]}
                placeholder="Search"
                value={search}
                onChangeText={(val) => setSearch(val)}>
            </TextInput>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        borderRadius: 7,
        height: 40,
        marginVertical: 10,
        backgroundColor: 'gray',
    },
    searchBox: {
        maxWidth: '100%',
        flexGrow: 1,
        marginLeft: 5,
        fontSize: 20,
    },
})