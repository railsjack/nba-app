import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {connect} from 'react-redux';
import {getGames} from '../../store/actions/games_actions';
import Moment from 'moment';

class GamesComponent extends Component {
  componentDidMount() {
    this.props.dispatch(getGames())
  }

  render() {
    return (
      <>
        <View>
          <Text>Hello, I am in the Games.</Text>
        </View>
      </>
    );
  }
}


const mapStateToProps = state => {
  console.log(state);
  return {
    Games: state.Games
  }
}

export default connect(mapStateToProps)(GamesComponent);
