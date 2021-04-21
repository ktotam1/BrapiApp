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
import GermplasmDetails from './src/dataDisplays/germplasm/GermplasmDetails';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Results" component={DisplayScreen} />
	  <Stack.Screen name="GermplasmDetails" component={GermplasmDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

