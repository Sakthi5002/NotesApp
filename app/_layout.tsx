// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" />
//     </Stack>
//   );
// }

// import 'react-native-gesture-handler';
// import './gesture-handler';


import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./home";
import Note from "./note";
import Notes from "@/components/notes";

import { AppProvider } from "./appcontext";
import { ThemeProvider } from "@/assets/styles/globalcontext";

const MainStack = createStackNavigator();



export default function RootLayout() {



    return (
        <ThemeProvider>
            <AppProvider>
                <NavigationContainer independent={true}>
                    <MainStack.Navigator>
                        <MainStack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                        <MainStack.Screen name='Note' component={Note} options={{ headerShown: false }} />
                    </MainStack.Navigator>
                </NavigationContainer>
            </AppProvider>
        </ThemeProvider>
    )
}