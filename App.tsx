import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DataEntryScreen from './screens/DataEntryScreen';
import BillSplitScreen from './screens/BillSplitScreen';
import QRCodeScreen from './screens/QRCodeScreen';
import WebViewScreen from './screens/WebViewScreen';
import {Image} from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Data Entry" component={DataEntryScreen} /> */}
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="Bill Split" component={BillSplitScreen} />
        <Stack.Screen name="QR Code" component={QRCodeScreen} />
        <Stack.Screen name="Web View" component={WebViewScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}