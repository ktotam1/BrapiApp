import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
  Modal,
} from 'react-native';

function LoginScreen({props, navigation, route}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [server, setServer] = useState('cassavabase.org');
  const [hidePassword, setHidePassword] = useState(true);
  const toggleSwitch = () => setHidePassword(previousState => !previousState);
  const login = async loggedIn => {
    if (loggedIn) {
      let link = `https://${server}/brapi/v1/token?username=${userName}&password=${password}`;
      fetch(link)
        .then(response => response.json())
        .then(json => {
          if (json.access_token != null) {
            navigation.navigate('Search', {
              server: server,
              token: json.access_token,
              loggedIn: loggedIn,
              name: json.userDisplayName,
            });
          } else {
            alert('Username or Password not recognized!');
          }
        })
        .catch(error => console.error(error));
    } else {
      navigation.navigate('Search', {
        server: server,
        loggedIn: loggedIn,
        token: null,
      });
    }
  };

  return (
    <View style={styles.app}>
      <Text style={styles.text}>Username:</Text>
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={setUserName}
        autoCorrect={false}
      />
      <Text style={styles.text}>Password:</Text>
      <TextInput
        secureTextEntry={hidePassword}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        autoCorrect={false}
      />
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.text}>Show Password:</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={hidePassword ? '#fffff' : '#fffff'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={!hidePassword}
        />
      </View>
      <Text style={styles.text}>Server:</Text>
      <TextInput
        value={server}
        onChangeText={setServer}
        defaultValue="cassavabase.org"
        style={styles.input}
        autoCorrect={false}
      />
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => login(true)} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => login(false)} style={styles.button}>
          <Text style={styles.buttonText}>Contine Without Logging In...</Text>
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

export default LoginScreen;
