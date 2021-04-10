import React, {useEffect, useState} from 'react';
import {FlatList, Text, StyleSheet, View} from 'react-native';
import SimpleList from '../SimpleList';

function CommonCropNames(props) {
  let data = props.data;

  let extractKey = item => {
    return item.item;
  };

  let renderItem = item => {
    console.log(item);
    return (
      <View style={styles.itemview}>
        <Text style={styles.text}>{'Name: ' + item.item}</Text>
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

export default CommonCropNames;
