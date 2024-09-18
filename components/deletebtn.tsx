
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAppContext } from '@/app/appcontext';

export default function DeleteBtn({ note, navigation }) {

  const { deleteHandler } = useAppContext();

  return (

    <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteHandler(note.key, navigation)}>
      <MaterialCommunityIcons name="delete-circle" size={70} color="red" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deleteBtn: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
})