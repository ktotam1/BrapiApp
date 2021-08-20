import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {useEffect} from 'react/cjs/react.development';
import {withServerContext} from '../../contexts/ServerContext';

function Get({serverInfo, props, navigation, route}) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [command, setCommand] = useState('commoncropnames');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [database, setDatabase] = useState('');
  const [module, setModule] = useState('core');
  const server = serverInfo.server;
  const token = serverInfo.token;
  // const setLinkParent = props.setLink;
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
  function possibleCommands(command, setCommand, module) {
    switch (module) {
      case 'core':
        return (
          <Picker
            selectedValue={command}
            onValueChange={(itemValue, itemIndex) => setCommand(itemValue)}>
            <Picker.Item
              color="green"
              label="common crop names"
              value="commoncropnames"
            />
            <Picker.Item color="green" label="lists" value="lists" />
            <Picker.Item color="green" label="people" value="people" />
            <Picker.Item color="green" label="locations" value="locations" />
            <Picker.Item color="green" label="programs" value="programs" />
            <Picker.Item color="green" label="season" value="season" />
            <Picker.Item color="green" label="server info" value="serverinfo" />
            <Picker.Item color="green" label="study" value="study" />
          </Picker>
        );
      case 'genotyping':
        return (
          <Picker
            selectedValue={command}
            onValueChange={(itemValue, itemIndex) => setCommand(itemValue)}>
            <Picker.Item color="green" label="callsets" value="callsets" />
            <Picker.Item color="green" label="calls" value="calls" />
            <Picker.Item color="green" label="genome maps" value="maps" />
            <Picker.Item
              color="green"
              label="reference sets"
              value="referencesets"
            />
            <Picker.Item color="green" label="references" value="references" />
            <Picker.Item color="green" label="samples" value="samples" />
            {/* <Picker.Item color="white" label="variant sets" value="variantsets" />*/}
            <Picker.Item
              color="green"
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
            <Picker.Item color="green" label="events" value="events" />
            <Picker.Item color="green" label="image paths" value="images" />
            <Picker.Item color="green" label="methods" value="methods" />
            <Picker.Item
              color="white"
              label="observationlevels"
              value="observationlevels"
            />
            <Picker.Item color="white" label="variables" value="variables" />
            <Picker.Item
              color="green"
              label="observations"
              value="observations"
            />
            <Picker.Item color="green" label="ontologies" value="ontologies" />
            <Picker.Item color="green" label="scales" value="scales" />
            <Picker.Item color="green" label="traits" value="traits" />
          </Picker>
        );
      case 'germplasm':
        return (
          <Picker
            selectedValue={command}
            onValueChange={(itemValue, itemIndex) => setCommand(itemValue)}>
            <Picker.Item color="green" label="crosses" value="crosses" />
            <Picker.Item
              color="green"
              label="crossingproject"
              value="crossingproject"
            />
            <Picker.Item
              color="green"
              label="breedingmethods"
              value="breedingmethods"
            />
            <Picker.Item color="green" label="germplasm" value="germplasm" />
            <Picker.Item
              color="green"
              label="attribute values"
              value="attributevalues"
            />
            <Picker.Item color="green" label="attributes" value="attributes" />
            <Picker.Item
              color="green"
              label="plannedcrosses"
              value="plannedcrosses"
            />
            <Picker.Item color="green" label="seed lots" value="seedlots" />
          </Picker>
        );
    }
  }
  const getData = async () => {
    setLoading(true);

    let databaseString = '';
    if (database.length > 0) {
      databaseString = '/**' + database + '**/';
    }
    let link = `https://${server}${databaseString}/brapi/v2/${command}?page=${page}&pageSize=${pageSize}`;
    console.log('call:', link);
    fetch(link, {headers: {Authorization: 'Bearer ' + token}})
      .then(response => response.json())
      .then(json => {
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
  //useEffect(() => getData());
  return (
    <View style={styles.app}>
      <Text style={styles.text}>Module:</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={module}
          onValueChange={(itemValue, itemIndex) => setModule(itemValue)}>
          <Picker.Item color="green" label="Core" value="core" />
          <Picker.Item color="green" label="Germplasm" value="germplasm" />
          <Picker.Item color="green" label="Phenotyping" value="phenotyping" />
          <Picker.Item color="green" label="Genotyping" value="genotyping" />
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

export default withServerContext(Get);
