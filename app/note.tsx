import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { useAppContext } from "./appcontext";

import DeleteBtn from "@/components/deletebtn";


export default function Note({ navigation, route }) {

    const { note, isNew, maxKey } = route.params;

    const [noteHead, setNoteHead] = useState(note.head);
    const [noteBody, setNoteBody] = useState(note.body);

    const { saveHandler, theme } = useAppContext();

    const updateNoteHead = (text) => {
        setNoteHead(text);

    }

    const updateNoteBody = (text) => {
        setNoteBody(text);

    }

    return (
        <View style={[styles.container, theme.backgroundColor]}>
            <View style={styles.header}>
                <Entypo name="chevron-left" size={30} color="#FFD52E" onPress={() => navigation.goBack()} />
                <Entypo name="check" size={25} color="#FFD52E" style={styles.check} onPress={() => saveHandler(maxKey, noteHead, noteBody, navigation)} />
            </View>
            <ScrollView style={{ margin: 10 }}>
                <TextInput placeholder="Title" placeholderTextColor={'gray'} onChangeText={updateNoteHead} value={noteHead} style={[styles.titleInput, theme.textColor]}></TextInput>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.noteDateTime}>{note.date}</Text>
                    <Text style={styles.noteDateTime}>{note.time}</Text>
                </View>
                <TextInput multiline placeholder="Start typing" placeholderTextColor={'gray'} onChangeText={updateNoteBody} value={noteBody} style={[styles.bodyInput, theme.textColor]}></TextInput>
            </ScrollView>

            {!note.isNew && <DeleteBtn note={note} navigation={navigation} />}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        paddingTop: 40,
        marginTop: 30,
        backgroundColor: '#F9F9F9',
    },
    deleteBtn: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
    titleInput: {
        height: 50,
        fontSize: 30,
        paddingTop: 15,
    },
    bodyInput: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 18,
    },
    header: {
        flex: 0,
        position: 'relative',
        flexDirection: 'row',
    },
    check: {
        position: 'absolute',
        top: 4,
        right: 3,
    },
    noteDateTime: {
        marginVertical: 15,
        marginRight: 15,
        color: 'gray',
    },
})