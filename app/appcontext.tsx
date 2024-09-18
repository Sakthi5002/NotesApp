import React, { useEffect, createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';
import useNavigation from './usenavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from "date-fns";
import { useThemeContext } from '@/assets/styles/globalcontext';


const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const { lightTheme, darkTheme, toggleTheme, isLightTheme } = useThemeContext();
  const [theme, setTheme] = useState(lightTheme);

  const updateTheme = () => {
    toggleTheme();
    setTheme(isLightTheme ? darkTheme : lightTheme);
  }

  const storeNotes = async (notes) => {
    try {
      const jsonNotes = JSON.stringify(notes);

      await AsyncStorage.setItem('notes', jsonNotes);
    } catch (e) {
      console.error("Error saving notes:", e);
    }
  };

  const getNotes = async () => {
    try {
      const jsonNotes = await AsyncStorage.getItem('notes');
      return jsonNotes != null ? JSON.parse(jsonNotes) : [];
    } catch (e) {
      console.error("Error reading notes:", e);
      return [];
    }
  };

  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const loadNotes = async () => {
      const storedNotes = await getNotes();
      setNotes(storedNotes);
    };

    loadNotes();
  }, []);

  const [search, setSearch] = useState('');


  const saveHandler = (key, head, body, navigation) => {
    if (body && (body.trim().length != 0)) {
      setNotes((prevNotes) => {
        const now = new Date();
        const date = format(now, 'dd-MM-yyyy');
        const time = format(now, 'HH:mm:ss');
        prevNotes = prevNotes.filter((note) => note.key != (key + 1));
        navigation.goBack();
        const newNotes = [
          { key: (key + 1).toString(), head: head, body: body, date: date, time: time }, ...prevNotes,
        ]
        storeNotes(newNotes);

        return newNotes;
      });
    } else {
      Alert.alert(
        "Oops",
        "Note is empty",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed")
          }
        ],
      )
    }
  }

  const deleteHandler = (key, navigation) => {
    Alert.alert(
      "Delete",
      "Confirm Delete?",
      [
        {
          text: "Delete",
          onPress: () => {
            setNotes((prevNotes) => {

              navigation.goBack();
              const newNotes = prevNotes.filter((note) => note.key != key);
              storeNotes(newNotes);
              return newNotes
            });
          }
        },
      ],
      { cancelable: true }
    )
  }

  const filteredNotes = search
    ? notes.filter(note =>
      note.head.toLowerCase().includes(search.toLowerCase()) ||
      note.body.toLowerCase().includes(search.toLowerCase())
    )
    : notes;

  const value = {
    notes,
    saveHandler,
    deleteHandler,
    search,
    setSearch,
    filteredNotes,
    theme,
    updateTheme,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
