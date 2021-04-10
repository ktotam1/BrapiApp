import React, {useEffect, useState} from 'react';
import {FlatList, Text, StyleSheet, View} from 'react-native';

function CommonCropNames(props) {
  let data = props.data.result.data;
  let extractKey = props.extract;
  let renderItem = props.render;
  return (
    <View style={styles.view}>
      <FlatList
        style={styles.flatlist}
        data={data}
        renderItem={renderItem}
        keyExtractor={extractKey}
      />
    </View>
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

export default CommonCropNames;