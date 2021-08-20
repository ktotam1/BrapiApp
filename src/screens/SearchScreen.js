import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import SwitchSelector from 'react-native-switch-selector';
import {useEffect} from 'react/cjs/react.development';
import Get from './options/Get';
import Search from './options/Search';

//TODO: refactor possibleCommands, modes
//This component is deprecated
function SearchScreen({props, navigation, route}) {
  const [mode, setMode] = useState('Fetch');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const server = route.params.server;
  const loggedIn = route.params.loggedIn;
  const name = loggedIn ? route.params.name : 'guest';
  const token = route.params.token;
  const modes = mode => {
    switch (mode) {
      case 'Fetch':
        return <Get setLink={setLink} action={action} />;
      case 'Search':
        return <Search setLink={setLink} />;
    }
    return <Text style={styles.text}>Mode not yet supported</Text>;
  };

  const action = (mode, module, command) => {
    switch (mode) {
      case 'Search':
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
        break;
    }
  };
  const options = [
    {label: 'Fetch', value: 'Fetch'},
    {label: 'Search', value: 'Search'},
    {label: 'Pute', value: 'Put'},
    {label: 'Post', value: 'Post'},
  ];
  return (
    <View style={styles.app}>
      <Text style={styles.text}>{`Welcome, ${name}\nServer: ${server}\n`}</Text>
      <SwitchSelector
        options={options}
        initial={0}
        onPress={value => setMode(value)}
        buttonColor={'grey'}
        borderColor={'white'}
        backgroundColor={'black'}
        borderWidth={1}
        textColor={'white'}
      />
      {modes(mode)}
    </View>
  );
}

// function mode(value){
//   switch(value){
//     case 'get':

//   }
// }

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
