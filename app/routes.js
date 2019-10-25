import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

// SCREENS
import SignIn from './components/auth';
import News from './components/news';
import Article from './components/news/article';
import Games from './components/games';
import GamesArticle from './components/games/article';
import Profile from './components/profile'

import Logo from './utils/logo';

const headerConf = {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#001338',
    },
    headerTintColor: 'white',
    headerTitle: Logo,
  },
};

const NewsStack = createStackNavigator(
  {
    News,
    Article,
  },
  headerConf,
);

const GamesStack = createStackNavigator(
  {
    Games,
    GamesArticle,
  },
  headerConf,
);

const ProfileStack = createStackNavigator(
  {
    Profile
  },
  headerConf,
);

const AppStack = createBottomTabNavigator(
  {
    News: NewsStack,
    Games: GamesStack,
    Profile: ProfileStack,
  },
  {
    tabBarOptions: {
      activeTintColor: 'white',
      showLabel: false,
      activeBackgroundColor: '#00194b',
      inactiveBackgroundColor: '#001338',
      style: {
        backgroundColor: 'blue',
      },
    },
    initialRouteName: 'News',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'News') {
          iconName = 'ios-basketball';
        } else if (routeName === 'Games') {
          iconName = 'md-tv';
        } else if (routeName === 'Profile') {
          iconName = 'md-person';
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
  },
);

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
