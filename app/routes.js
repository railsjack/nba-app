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

const NewsStack = createStackNavigator({
  News,
  Article
})

const GamesStack = createStackNavigator({
  Games,
  GamesArticle
})

const AppStack = createBottomTabNavigator({
  News: NewsStack,
  Games: GamesStack,
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
