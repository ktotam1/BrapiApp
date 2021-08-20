import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Modal} from 'react-native';
import SimpleList from '../SimpleList';

function Germplasm(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  let data = props.data;

  let extractKey = item => {
    return item.germplasmPUI;
  };

  let renderItem = item => {
    console.log(item.item);
    return (
      <TouchableOpacity
        onPress={() => {
          setCurrentItem(item.item);
          setModalVisible(true);
        }}>
        <View style={styles.itemview}>
          <Text style={styles.text}>
            {`Crop Name: ${item.item.commonCropName}
Germplasm Name: ${item.item.germplasmName}
Genus: ${item.item.genus}
Documentation URL: ${item.item.documentationURL}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Modal
        style={styles.modal}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.modal}>
          <Text>
            {`Collection: ${currentItem.collection}
Additonal Info: ${currentItem.additionalInfo}\nGermplasm Name: ${currentItem.germplasmName}
Accession Number: ${currentItem.accessionNumber}
Genus: ${currentItem.genus}
Germplasm Preprocessing: ${currentItem.germplasmPreprocessing}
Germplasm Db ID: ${currentItem.germplasmDbId}
Germplasm Origin: ${currentItem.germplasmOrigin}             
Country of Origin Code: ${currentItem.countryOfOriginCode}             
Seed Source Description: ${currentItem.seedSourceDescription}             
Breeding Method Db ID: ${currentItem.breedingMethodDbId}             
Storage Types: ${currentItem.storageTypes}             
Documentation URL: ${currentItem.documentationURL}             
SubTaxa: ${currentItem.subtaxa}           
Synonyms: ${currentItem.synonyms}
Default Display Name: ${currentItem.defaultDisplayName}
Species: ${currentItem.species}
Germplasm PUI: ${currentItem.germplasmPUI}
Biological Status of Accession Description: ${currentItem.biologicalStatusOfAccessionDescription}
Acquisition Date: ${currentItem.acquisitionDate}
Common Crop Name: ${currentItem.commonCropName}\n\n`}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Text>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <SimpleList data={data} extract={extractKey} render={renderItem} />
    </View>
  );
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
  modal: {
    margin: 20,
    backgroundColor: 'grey',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default Germplasm;
