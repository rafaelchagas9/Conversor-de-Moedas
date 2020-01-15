import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import 'react-native-gesture-handler';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/home'
import currencyConverter from './screens/currencyConverter'

const TabNavigator = createBottomTabNavigator({
  Home: {screen: Home,
    navigationOptions:{
      tabBarLabel: 'Início',
      tabBarIcon: ({tintColor}) => (
        <Icon name="home" size={20} color='#E8e8e8'></Icon>
      )
    }
  },
  currencyConverter: {screen: currencyConverter,
  navigationOptions:{
    tabBarLabel: 'Converter',
    tabBarIcon: ({tintColor}) => (
    <Icon name="exchange-alt" size={20} color='#E8e8e8'></Icon>
    )
  }}
},
  {
    tabBarOptions:{
      style:{
        backgroundColor: "#0d0d0d"
      }
    }
  }
);

export default createAppContainer(TabNavigator);