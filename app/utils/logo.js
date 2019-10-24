import React from 'react';
import {Image} from 'react-native';

import LogoImage from '../assets/images/nba_login_logo.png';

const LogoTitle = () => (
  <Image
    source={LogoImage}
    style={{width: 70, height: 35}}
    resizeMode="contain"
  />
);

export default LogoTitle;
