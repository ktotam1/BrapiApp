import React, {useEffect, useState} from 'react';
import {FlatList, Text, StyleSheet, View} from 'react-native';
import SimpleList from '../SimpleList';
function People(props) {
  let data = props.data;

  let extractKey = item => {
    return item.userID;
  };

  let renderItem = item => {
    return (
      <View style={styles.itemview}>
        <Text style={styles.text}>
          {'Name: ' +
            item.item.firstName +
            ' ' +
            item.item.lastName +
            '\nEmail: ' +
            item.item.emailAddress +
            '\nUserID: ' +
            item.item.userID}
        </Text>
      </View>
    );
  };
  return (
    <SimpleList data={props.data} render={renderItem} extract={extractKey} />
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    margin: 4,
  },
  itemview: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 3,
  },
  view: {
    borderColor: 'white',
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 3,
    minHeight: 300,
  },
  flatlist: {
    margin: 5,
  },
});

export default People;
