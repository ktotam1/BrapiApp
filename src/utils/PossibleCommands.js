import React from 'react';
import Picker from '@react-native-community/picker';

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

//export default PossibleCommands;
