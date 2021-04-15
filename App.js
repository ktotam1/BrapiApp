import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import DisplaySwitch from './src/DisplaySwitch';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import SearchScreen from './src/screens/SearchScreen';
import DisplayScreen from './src/screens/DisplayScreen';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Results" component={DisplayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
