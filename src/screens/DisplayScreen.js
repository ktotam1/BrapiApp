import React from 'react';
import {Text, StyleSheet, View, ActivityIndicator} from 'react-native';
import DisplaySwitch from '../DisplaySwitch';

function DisplayScreen({props, navigation, route}) {
  let dispModule = route.params.module;
  let dispCommand = route.params.command;
  let dispData = route.params.data;
  return (
    <View style={styles.app}>
      <View>
        <DisplaySwitch
          module={dispModule}
          command={dispCommand}
          data={dispData}
        />
        <Text style={styles.text}>
          {dispData.metadata !== undefined
            ? `Current Page: ${dispData.metadata.pagination.currentPage + 1}
Total Data: ${dispData.metadata.pagination.totalCount}
Total Pages: ${dispData.metadata.pagination.totalPages}`
            : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    padding: 24,
    backgroundColor: 'black',
  },
  buttonView: {
    minHeight: 50,
    marginTop: 5,
  },
  text: {
    color: 'white',
  },
  button: {
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
  },
  input: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    color: 'white',
  },
  picker: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
  },
  loading: {
    flex: 1,
  },
  page: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  pageButtonText: {
    color: 'white',
    fontSize: 24,
    alignSelf: 'center',
  },
  pageButtonView: {
    borderColor: 'white',
    borderRadius: 30,
    borderWidth: 1,
    alignContent: 'center',
  },
});

export default DisplayScreen;
