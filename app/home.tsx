import React, { useState } from "react";
import { Text, Text as RNText, View, StyleSheet, FlatList, TouchableOpacity, Button } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAppContext } from "./appcontext";
import SearchBox from "@/components/searchbox";
import ThemeBtn from "@/components/themebtn";
import { DarkTheme } from "@react-navigation/native";

export default function Home({ navigation }) {
  const { notes, filteredNotes, search, theme } = useAppContext();

  const keys = notes.map(obj => parseInt(obj.key));

  const maxKey = (keys.length > 0) ? Math.max(...keys) : 0;

  const isNew = false;

  const highlightText = (text) => {
    if (!search) return <RNText>{text}</RNText>;

    const parts = text.split(new RegExp(`(${search})`, 'gi'));

    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <RNText key={index} style={styles.highlight}>{part}</RNText>
      ) : (
        <RNText key={index}>{part}</RNText>
      )
    );
  };

  return (
    <View style={[styles.container, theme.backgroundColor]} >
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.notesHeader}>Notes</Text>
        <ThemeBtn />
      </View>
      <SearchBox />
      <View style={styles.notesListContainer}>
        <FlatList
          data={filteredNotes}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: '#E5E5E5' }}>
              <TouchableOpacity style={styles.notesContainer} onPress={() => navigation.navigate('Note', { maxKey: (item.key) - 1, note: item, isNew: false })}>
                <View style={[styles.note, theme.backgroundColor]}>
                  <Text style={[styles.noteHead, theme.backgroundColor, theme.textColor]}>{highlightText(item.head)}</Text>
                  <Text style={[styles.noteBody, theme.backgroundColor, theme.textColor]}>{highlightText(item.body)}</Text>
                </View>
                <View style={[{ flexDirection: 'row' }, theme.backgroundColor]}>
                  <Text style={[styles.noteDateTime, theme.backgroundColor]}>Date:{highlightText(item.date)}</Text>
                  <Text style={[styles.noteDateTime, theme.backgroundColor]}>Time:{highlightText(item.time)}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )} />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Note', { maxKey: maxKey, note: { head: '', body: '', isNew: true } })}
      >
        <AntDesign name="pluscircle" size={60} color="#FFD52E" style={styles.addBtn} />
      </TouchableOpacity>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#F9F9F9',
    // ghostWhite: #F9F9F9
    // platinum: #E5E5E5
    // oldBg: #e6e6e6
    // sunbloom: #FFD52E
  },
  notesHeader: {
    fontSize: 40,
    left: 8,
    color: '#FFD52E',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
  },
  notesListContainer: {
    flex: 1,
  },
  notesContainer: {
    width: '100%',
    marginBottom: 1,
  },
  note: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#F9F9F9',
    padding: 10,
    maxHeight: 200,
  },
  noteHead: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noteBody: {
    fontSize: 15,
  },
  addBtn: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 100,
  },
  noteDateTime: {
    margin: 5,
    marginLeft: 10,
    backgroundColor: '#F9F9F9',
    color: 'gray',
  },
  highlight: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'yellow',
  },
})