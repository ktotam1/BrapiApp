import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-community/picker';

function SearchScreen({props, navigation, route}) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [command, setCommand] = useState('commoncropnames');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [database, setDatabase] = useState('');
  const [module, setModule] = useState('core');
  const server = route.params.server;
  const loggedIn = route.params.loggedIn;
  const name = route.params.name;
  const token = route.params.token;
  const getData = async () => {
    setLoading(true);

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
      page +
      '&' +
      'pageSize=' +
      pageSize;
    console.log('call:', link);
    fetch(link, {headers: {Authorization: 'Bearer ' + token}})
      .then(response => response.json())
      .then(json => {
        setData(json);
        navigation.navigate('Results', {
          module: module,
          command: command,
          data: json,
        });
      })
      .catch(error => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  let decreasePage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
    if (page <= 0) {
      setPage(0);
    }
  };
  let decreasePageSize = () => {
    if (pageSize > 0) {
      setPageSize(pageSize - 1);
    }
    if (pageSize <= 0) {
      setPageSize(0);
    }
  };
  return (
    <View style={styles.app}>
      <Text style={styles.text}>Module:</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={module}
          onValueChange={(itemValue, itemIndex) => setModule(itemValue)}>
          <Picker.Item color="white" label="Core" value="core" />
          <Picker.Item color="white" label="Germplasm" value="germplasm" />
          <Picker.Item color="white" label="Phenotyping" value="phenotyping" />
          <Picker.Item color="white" label="Genotyping" value="genotyping" />
        </Picker>
      </View>
      <Text style={styles.text}>Command:</Text>
      <View style={styles.picker}>
        {possibleCommands(command, setCommand, module)}
      </View>
      <Text style={styles.text}>Database:</Text>
      <TextInput
        value={database}
        onChangeText={setDatabase}
        style={styles.input}
      />
      <Text style={styles.text}>Page:</Text>
      <View style={styles.page}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={decreasePage}>
            <View style={styles.pageButtonView}>
              <Text style={styles.pageButtonText}>{'<'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.pageButtonText}>{page + 1}</Text>
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
      <Text style={styles.text}>Page Size:</Text>
      <View style={styles.page}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={decreasePageSize}>
            <View style={styles.pageButtonView}>
              <Text style={styles.pageButtonText}>{'<'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.pageButtonText}>{pageSize}</Text>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              setPageSize(pageSize + 1);
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
  );
}

function possibleCommands(command, setCommand, module) {
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
          <Picker.Item color="white" label="callsets" value="callsets" />
          <Picker.Item color="white" label="calls" value="calls" />
          <Picker.Item color="white" label="genome maps" value="maps" />
          <Picker.Item
            color="white"
            label="reference sets"
            value="referencesets"
          />
          <Picker.Item color="white" label="references" value="references" />
          <Picker.Item color="white" label="samples" value="samples" />
          {/* <Picker.Item color="white" label="variant sets" value="variantsets" />*/}
          <Picker.Item
            color="white"
            label="vendor orders"
            value="vendor/orders"
          />
        </Picker>
      );
    case 'phenotyping':
      return (
        <Picker
          selectedValue={command}
          onValueChange={(itemValue, itemIndex) => setCommand(itemValue)}>
          <Picker.Item color="white" label="events" value="events" />
          <Picker.Item color="white" label="image paths" value="images" />
          <Picker.Item color="white" label="methods" value="methods" />
          <Picker.Item
            color="white"
            label="observationlevels"
            value="observationlevels"
          />
          <Picker.Item color="white" label="variables" value="variables" />
          <Picker.Item
            color="white"
            label="observations"
            value="observations"
          />
          <Picker.Item color="white" label="ontologies" value="ontologies" />
          <Picker.Item color="white" label="scales" value="scales" />
          <Picker.Item color="white" label="traits" value="traits" />
        </Picker>
      );
    case 'germplasm':
      return (
        <Picker
          selectedValue={command}
          onValueChange={(itemValue, itemIndex) => setCommand(itemValue)}>
          <Picker.Item color="white" label="crosses" value="crosses" />
          <Picker.Item
            color="white"
            label="crossingproject"
            value="crossingproject"
          />
          <Picker.Item
            color="white"
            label="breedingmethods"
            value="breedingmethods"
          />
          <Picker.Item color="white" label="germplasm" value="germplasm" />
          <Picker.Item
            color="white"
            label="attribute values"
            value="attributevalues"
          />
          <Picker.Item color="white" label="attributes" value="attributes" />
          <Picker.Item
            color="white"
            label="plannedcrosses"
            value="plannedcrosses"
          />
          <Picker.Item color="white" label="seed lots" value="seedlots" />
        </Picker>
      );
  }
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

export default SearchScreen;
