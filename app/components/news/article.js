import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Moment from 'moment';

class ArticleComponent extends Component {
  formatContent( content ) {
    return content.replace(/<p>/g, '').replace(/<\/p>/g, '');
  }

  render() {
    const params = this.props.navigation.state.params;
    return (
      <ScrollView style={{backgroundColor: '#f0f0f0'}}>
        <Image
          style={{height: 250}}
          source={{uri: params.image}}
          resizeMode="cover"
        />
        <View style={styles.articleContainer}>
          <View>
            <Text style={styles.articleTitle}>{params.title}</Text>
            <Text style={styles.articleData}>
              {params.team} - Posted at: {Moment(params.date).format('d MMMM')}
            </Text>
          </View>
          <View style={styles.articleContent}>
            <Text style={styles.articleText}>
              {this.formatContent(params.content)}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  articleContainer: {
    padding: 10,
  },
  articleTitle: {
    fontSize: 16,
    color: '#323232',
    fontFamily: 'Roboto-Bold',
  },
  articleData: {
    fontSize: 12,
    color: '#a2a2a2',
    fontFamily: 'Roboto-Light',
  },
  articleContent: {
    marginTop: 20,
  },
  articleText: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Roboto-Regular',
  },
});

export default ArticleComponent;
