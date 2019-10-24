import React, {Component} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import AuthLogo from './authLogo';
import AuthForm from './authForm';

import {connect} from 'react-redux';
import {autoSignIn} from '../../store/actions/user_actions';
import {bindActionCreators} from 'redux';

import {getTokens, setTokens} from '../../utils/misc';

class AuthComponent extends Component {
  state = {
    loading: true,
  };

  goNext = () => {
    this.props.navigation.navigate('App');
  };

  componentDidMount() {
    getTokens(value => {
      if (value[0][1] === null) {
        this.setState({loading: false});
      } else {
        this.props.autoSignIn(value[1][1]).then(() => {
          if (!this.props.User.auth.token) {
            this.setState({loading: false});
          } else {
            setTokens(this.props.User.auth, () => {
              this.goNext();
            });
          }
        });
      }
    });
  }

  render() {
    const {User} = this.props;
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <>
          <ScrollView style={styles.container}>
            <AuthLogo />
            <AuthForm User={User} goNext={this.goNext} />
          </ScrollView>
        </>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d428a',
    padding: 50,
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    User: state.User,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({autoSignIn}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthComponent);
