import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import SimpleList from '../SimpleList';

function Germplasm(props) {
  let data = props.data;

  let extractKey = item => {
    return item.germplasmPUI;
  };

  let renderItem = item => {
    console.log(item.item);
    return (
      <View style={styles.itemview}>
        <Text style={styles.text}>
          {`Crop Name: ${item.item.commonCropName}
Germplasm Name: ${item.item.germplasmName}
Genus: ${item.item.genus}
Documentation URL: ${item.item.documentationURL}`}
        </Text>
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

export default Germplasm;
