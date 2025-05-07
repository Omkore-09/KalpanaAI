import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LikeScreen from './src/screens/LikeScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import { colors } from './src/theme';
import { LikeImagesProvider } from './src/context/LikeImageContext';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <LikeImagesProvider>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.activeTabColor,
          tabBarStyle:{
            backgroundColor: colors.primary,
          },
          tabBarInactiveTintColor : colors.inactiveTabColor,
          tabBarShowLabel : false
        }}>
        <Tab.Screen
          name="HOME_SCREEN"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color, focused, size}) => (
              <Ionicons
                name={focused ? 'home-sharp' : 'home-outline'}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen name="DISCOVER_SCREEN" component={DiscoverScreen} 
        options={{
          tabBarIcon: ({color, focused, size}) => (
            <Ionicons
              name={focused ? 'globe' : 'globe-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        
        />
        <Tab.Screen name="LIKE_SCREEN" component={LikeScreen}  
        options={{
          tabBarIcon: ({color, focused, size}) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    </LikeImagesProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
