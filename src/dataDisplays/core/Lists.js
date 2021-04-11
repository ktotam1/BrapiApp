import React, {useEffect, useState} from 'react';
import {FlatList, Text, StyleSheet, View} from 'react-native';
import SimpleList from '../SimpleList';

function Lists(props) {
  let data = props.data;

  let extractKey = item => {
    return item.item;
  };

  let renderItem = item => {
    return (
      <View style={styles.itemview}>
        <Text style={styles.text}>{'List Name: ' + item.item.listName}</Text>
      </View>
    );
  };
  return <SimpleList data={data} extract={extractKey} render={renderItem} />;
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
});

export default Lists;
