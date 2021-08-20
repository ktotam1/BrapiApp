import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Get from './options/Get';
import Search from './options/Search';
import Put from './options/Put';
import Post from './options/Post';
import {ServerContextProvider} from '../contexts/ServerContext';

const Tab = createBottomTabNavigator();

function Tabs({props, navigation, route}) {
  const [loading, setLoading] = useState(false);
  const server = route.params.server;
  const loggedIn = route.params.loggedIn;
  const name = loggedIn ? route.params.name : 'guest';
  const token = route.params.token;
  const serverInfo = {
    server: server,
    loggedIn: loggedIn,
    name: name,
    token: token,
  };
  return (
    <ServerContextProvider serverInfo={serverInfo}>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Get" component={Get} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Post" component={Post} />
        <Tab.Screen name="Put" component={Put} />
      </Tab.Navigator>
    </ServerContextProvider>
  );
}

export default Tabs;
