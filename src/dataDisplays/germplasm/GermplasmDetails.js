
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

function GermplasmDetails( { route, navigation, props }) {


    const data=route.params.data;

    return (<View><Text>
	    { `${data.collection }
             ${data.additionalInfo}
             ${data.germplasmName}
             ${data.accessionNumber}
             ${data.genus}
             ${data.germplasmPreprocessing}
             ${data.germplasmDbId}
             ${data.germplasmOrigin}
             ${data.countryOfOriginCode}
             ${data.seedSourceDescription}
             ${data.breedingMethodDbId}
             ${data.storageTypes}
             ${data.documentationURL}
             ${data.subtaxa}
             ${data.synonyms}
             ${data.defaultDisplayName}
             ${data.species}
             ${data.germplasmPUI}
             ${data.biologicalStatusOfAccessionDescription}
             ${data.acquisitionDate}
             ${data.commonCropName}` }
	    </Text></View>) ;
}


export default GermplasmDetails;


