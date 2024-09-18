import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppContext } from "@/app/appcontext";
import { useContext } from 'react';
import { useThemeContext } from '@/assets/styles/globalcontext';


export default function ThemeBtn() {
  const { updateTheme } = useAppContext();
  const { themeIcon } = useThemeContext();



  return (
    <View style={styles.themeBtn}>
      <TouchableOpacity style={styles.themeBtn} onPress={() => updateTheme()}>
        <MaterialIcons name={themeIcon} size={40} color="#FFD52E" style={styles.themeBtn} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  themeBtn: {
    position: 'absolute',
    right: 0,
    top: 5,
  },
})