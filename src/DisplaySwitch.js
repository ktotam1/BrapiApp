import React from 'react';
import {StyleSheet, View} from 'react-native';
import CommonCropNames from './dataDisplays/core/CommonCropNames';
import People from './dataDisplays/core/People';

function DisplaySwitch(props) {
  if (props.data.result !== undefined) {
    switch (props.module) {
      case 'core':
        switch (props.command) {
          case 'people':
            return <People data={props.data} />;
          case 'commoncropnames':
            return <CommonCropNames data={props.data} />;
        }
        break;
      case 'genotyping':
        break;
      case 'germplasm':
        break;
      case 'phenotyping':
        break;
    }
  }
  return <View style={styles.view} />;
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default DisplaySwitch;
