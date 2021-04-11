import React from 'react';
import {StyleSheet, View} from 'react-native';
import CommonCropNames from './dataDisplays/core/CommonCropNames';
import Lists from './dataDisplays/core/Lists';
import Locations from './dataDisplays/core/Locations';
import People from './dataDisplays/core/People';
import Germplasm from './dataDisplays/germplasm/Germplasm';

function DisplaySwitch(props) {
  if (props.data.result !== undefined) {
    switch (props.module) {
      case 'core':
        switch (props.command) {
          case 'people':
            return <People data={props.data} />;
          case 'commoncropnames':
            return <CommonCropNames data={props.data} />;
          case 'lists':
            return <Lists data={props.data} />;
          case 'locations':
            return <Locations data={props.data} />;
        }
        break;
      case 'genotyping':
        break;
      case 'germplasm':
        switch (props.command) {
          case 'germplasm':
            return <Germplasm data={props.data} />;
        }
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
