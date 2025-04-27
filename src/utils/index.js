import { Alert, PermissionsAndroid, Platform } from "react-native";

export const requestWriteStoragePermission = async () => {
    try {
        if(Number(Platform.Version) >= 33){
            return true;
        }

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Kalpana Chitra Storage Permission',
          message:
            'kalpana Chitra App needs access to your camera ' +
            'to download the pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
        return true ;
      } else {
        Alert.alert("Permisssions Denied", 'You need to allow storage permission to download photos', [{text : "Ok"}] )
        console.log('Storage permission denied');
        return false ;
      }
    } catch (err) {
      console.warn(err);
      Alert.alert("Error","Their is an isuue while requesting to the storage permission. Please try again.",[
        {
          text : "OK"
        }
      ] )
      return false ;
    }
  };