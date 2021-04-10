import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import DisplaySwitch from './src/DisplaySwitch';

function possibleCommands(module, command, setCommand) {
  switch (module) {
    case 'core':
      return (
        <Picker
          selectedValue={command}
          onValueChange={(itemValue, itemIndex) => setCommand(itemValue)}>
          <Picker.Item
            color="white"
            label="common crop names"
            value="commoncropnames"
          />
          <Picker.Item color="white" label="lists" value="lists" />
          <Picker.Item color="white" label="people" value="people" />
          <Picker.Item color="white" label="locations" value="locations" />
          <Picker.Item color="white" label="programs" value="programs" />
          <Picker.Item color="white" label="season" value="season" />
          <Picker.Item color="white" label="server info" value="serverinfo" />
          <Picker.Item color="white" label="study" value="study" />
        </Picker>
      );
    case 'genotyping':
      return (
        <Picker
          selectedValue={command}
          onValueChange={(itemValue, itemIndex) => setCommand(itemValue)}>
          <Picker.Item label="geno" value="geno" />
        </Picker>
      );
    case 'phenotyping':
      return (
        <Picker
          selectedValue={command}
          onValueChange={(itemValue, itemIndex) => setCommand(itemValue)}>
          <Picker.Item label="pheno" value="pheno" />
        </Picker>
      );
    case 'germplasm':
      return (
        <Picker
          selectedValue={command}
          onValueChange={(itemValue, itemIndex) => setCommand(itemValue)}>
          <Picker.Item label="germplasm" value="germ" />
        </Picker>
      );
  }
}

function App() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [command, setCommand] = useState('commoncropnames');
  const [server, setServer] = useState('cassavabase.org');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [database, setDatabase] = useState('');
  const [module, setModule] = useState('core');
  const [dispModule, setDispModule] = useState(module);
  const [dispCommand, setDispCommand] = useState(command);
  const [dispData, setDispData] = useState(data);
  const getData = async () => {
    setLoading(true);
    setDispModule(module);
    setDispCommand(command);

    let databaseString = '';
    if (database.length > 0) {
      databaseString = '/**' + database + '**/';
    }
    let link =
      'https://' +
      server +
      databaseString +
      '/brapi/v2/' +
      command +
      '?' +
      'page=' +
      page;
    console.log('call:', link);
    fetch(link)
      .then(response => response.json())
      .then(json => {
        setData(json);
        setDispData(json);
        console.log(json);
      })
      .catch(error => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  let decrease = () => {
    if (page > 0) {
      setPage(page - 1);
    }
    if (page <= 0) {
      setPage(0);
    }
  };

  return (
    <View style={styles.app}>
      {isLoading ? (
        <ActivityIndicator size="large" style={styles.loading} color="white" />
      ) : (
        <View style={{flex: 1, marginBottom: 20}}>
          <DisplaySwitch
            module={dispModule}
            command={dispCommand}
            data={dispData}
          />
          <Text style={styles.text}>
            {dispData.metadata !== undefined
              ? `Current Page: ${dispData.metadata.pagination.currentPage}
Total Data: ${dispData.metadata.pagination.totalCount}
Total Pages: ${dispData.metadata.pagination.totalPages}`
              : ''}
          </Text>
        </View>
      )}
      <View style={{flex: 1, marginTop: 35}}>
        <Text style={styles.text}>Module:</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={module}
            onValueChange={(itemValue, itemIndex) => setModule(itemValue)}>
            <Picker.Item color="white" label="Core" value="core" />
            <Picker.Item color="white" label="Germplasm" value="germplasm" />
            <Picker.Item
              color="white"
              label="Phenotyping"
              value="phenotyping"
            />
            <Picker.Item color="white" label="Genotyping" value="genotyping" />
          </Picker>
        </View>
        <Text style={styles.text}>Command:</Text>
        <View style={styles.picker}>
          {possibleCommands(module, command, setCommand)}
        </View>
        <Text style={styles.text}>Server:</Text>
        <TextInput
          value={server}
          onChangeText={setServer}
          defaultValue="cassavabase.org"
          style={styles.input}
        />
        <Text style={styles.text}>Database:</Text>
        <TextInput
          value={database}
          onChangeText={setDatabase}
          style={styles.input}
        />
        <Text style={styles.text}>Page:</Text>
        <View style={styles.page}>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={decrease}>
              <View style={styles.pageButtonView}>
                <Text style={styles.pageButtonText}>{'<'}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.pageButtonText}>{page}</Text>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => {
                setPage(page + 1);
              }}>
              <View style={styles.pageButtonView}>
                <Text style={styles.pageButtonText}>{'>'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={getData} style={styles.button}>
            <Text style={styles.buttonText}>Fetch</Text>
          </TouchableOpacity>
        </View>
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

export default App;