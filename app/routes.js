import React from 'react';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

// SCREENS
import SignIn from './components/auth';
import News from './components/news';
import Article from './components/news/article';
import Games from './components/games';
import GamesArticle from './components/games/article';
import Logo from './utils/logo';


const headerConf = {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#001338'
    },
    headerTintColor: 'white',
    headerTitle: Logo
  }
}

const NewsStack = createStackNavigator({
  News,
  Article
}, headerConf)

const GamesStack = createStackNavigator({
  Games,
  GamesArticle
}, headerConf)

const AppStack = createBottomTabNavigator({
  News: NewsStack,
  Games: GamesStack,
}, {
  tabBarOptions: {
    activeTintColor: 'white',
    showLabel: false,
    activeBackgroundColor: '#00194b',
    inactiveBackgroundColor: '#001338',
    style: {
      backgroundColor: 'blue'
    }
  }
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
