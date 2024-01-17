import React from 'react';
import {Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import DataEntryScreen from './screens/DataEntryScreen';
import ReceiptList from './screens/ReceiptList';
import QRCodeScannerScreen from './screens/QRCodeScannerScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigatorComponent: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Entry"
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({color, size}) => {
          let iconName: string;

          if (route.name === 'List') {
            iconName = 'library-outline';
          } else if (route.name === 'Qrscan') {
            iconName = 'qr-code';
          } else if (route.name === 'Entry') {
            iconName = 'calculator-outline';
          }
          return <Icon name={iconName!} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#8E9D97',
        tabBarStyle: {position: 'absolute'},
        tabBarBackground: () => (
          <Image
            source={require('../assets/cover.png')}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        ),
      })}>
      <Tab.Screen
        options={{
          title: 'Calculator',
          headerRight: () => (
            <Icon name='reload' size={20} style={{paddingLeft:5}} color='gray' />
          ),
        }}
        name="List"
        component={ReceiptList}
      />
      <Tab.Screen
        name="Entry"
        component={DataEntryScreen}
        options={{
          title: '',
          headerLeft: () => (
            <Image
              source={require('../assets/logo.png')}
              style={{width: 35, height: 35, marginLeft: '20%'}}
            />
          ),
        }}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Qrscan"
        component={QRCodeScannerScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigatorComponent;
