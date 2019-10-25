import React, {Component} from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import Moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserInfo} from '../../store/actions/user_actions';
import {getTokens, removeTokens} from '../../utils/misc';

class ProfileComponent extends Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    getTokens(value => {
      if (value[0][1] === null) {
        this.setState({loading: true});
      } else {
        this.props.getUserInfo(value[0][1]).then(() => {
          this.setState({loading: false});
        });
      }
    });
  }

  logOut = () => {
		this.setState({loading: true});
		removeTokens(() => {
			setTimeout(() => {
				this.props.navigation.navigate('Auth');
			}, 1500);
    });
	}

  showUserInfo = () => {
    const {user_info} = this.props.User;
    return this.state.loading ? (
      <ActivityIndicator style={{marginTop: 20}} />
    ) : (
      <>
        <View style={styles.itemContainer}>
          <Text style={styles.itemLabel}>Name</Text>
          <Text style={styles.itemValue}>{user_info.displayName}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemLabel}>Email</Text>
          <Text style={styles.itemValue}>{user_info.email}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemLabel}>Created At</Text>
          <Text style={styles.itemValue}>
            {Moment(user_info.createdAt * 1).format('MMM D, YYYY')}
          </Text>
        </View>
        <View style={styles.itemContainer2}>
          <Button title="Logout" onPress={this.logOut} />
        </View>
      </>
    );
  };

  render() {
    return <View style={styles.profileContainer}>{this.showUserInfo()}</View>;
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: 'center',
		backgroundColor: '#f0f0f0',
		paddingTop: 20,
  },
  itemContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    backgroundColor: '#f2f2f2',
    width: '80%',
    borderRadius: 3,
    padding: 10,
  },
  itemContainer2: {
    marginTop: 20,
    width: '80%',
  },
  itemLabel: {
    fontSize: 11,
    fontFamily: 'Roboto-Light',
  },
  itemValue: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
});

function mapStateToProps(state) {
  console.log('state.User: ', state.User);
  return {
    User: state.User,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getUserInfo}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileComponent);
