import React from 'react';

import {Platform} from 'react-native';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import {createBottomTabNavigator} from 'react-navigation-tabs';

import {createStackNavigator} from 'react-navigation-stack';

// SCREENS
import SignIn from './components/auth';
import News from './components/news';
import Games from './components/games';

const AppStack = createBottomTabNavigator({
  News,
  Games,
});

const AuthStack = createStackNavigator(
  {
    SignIn,
  },
  {
    headerMode: 'none',
  },
);

export const RootNavigator = isAuth =>
  createAppContainer(
    createSwitchNavigator(
      {
        App: AppStack,
        Auth: AuthStack,
      },
      {
        initialRouteName: isAuth ? 'App' : 'Auth',
      },
    ),
  );
