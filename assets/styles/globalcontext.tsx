import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from "date-fns";
import React, { createContext, useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SearchBar } from "react-native-screens";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

// const ghostWhite = '#F9F9F9';
// const platinum = '#E5E5E5';
// const olgBg = '#e6e6e6';
// const sunbloom = '#FFD52E';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const lightTheme = StyleSheet.create({
        backgroundColor: {
            backgroundColor: '#F9F9F9'
        },
        textColor: {
            color: '#101010',
        },
        searchBoxBackgroundColor: {
            backgroundColor: '#E5E5E5',
        }
    });

    const darkTheme = StyleSheet.create({
        backgroundColor: {
            backgroundColor: '#101010',
        },
        textColor: {
            color: '#DCDCDC'
        },
        searchBoxBackgroundColor: {
            backgroundColor: '#e5e5e5',
        },
    });

    const [isLightTheme, setLightTheme] = useState(async () => {
        try {
            const theme = await AsyncStorage.getItem('theme');
            console.log(theme);

            return theme != null ? JSON.parse(theme) : [];
        } catch (e) {
            console.error("Error reading notes:", e);
            return [];
        }
    });
    const [themeIcon, setThemeIcon] = useState(isLightTheme ? 'dark-mode' : 'light-mode');

    useEffect(() => {
        const loadTheme = async () => {
            const storedTheme = await getTheme();
            setLightTheme(storedTheme);
        };

        loadTheme();
    }, []);
    const storeTheme = async (isLightTheme) => {
        try {
            const theme = JSON.stringify(isLightTheme);
            console.log(theme);


            await AsyncStorage.setItem('theme', theme);
        } catch (e) {
            console.error("Error saving notes:", e);
        }
    };

    const getTheme = async () => {
        try {
            const theme = await AsyncStorage.getItem('theme');
            return theme != null ? JSON.parse(theme) : [];
        } catch (e) {
            console.error("Error reading notes:", e);
            return [];
        }
    };


    const toggleTheme = () => {
        setLightTheme((prevTheme) => !prevTheme);
        storeTheme(isLightTheme);
        if (themeIcon == 'light-mode') {
            setThemeIcon('dark-mode');
        } else {
            setThemeIcon('light-mode');
        }
    }

    const value = {
        isLightTheme,
        darkTheme,
        lightTheme,
        toggleTheme,
        themeIcon,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider >
    );
}

export const useThemeContext = () => useContext(ThemeContext);