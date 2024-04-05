import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Pressable, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { newBarcode } from '../redux/currentBarcodeSlice';
import { BarCodeScanner } from 'expo-barcode-scanner'; 
import { showMessage } from 'react-native-flash-message';
import { check } from './newProduct';

export default function BarcodeScreen({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  let stock = useSelector(state => state.inventoryList.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    if(data in stock){
      navigation.replace(route.params.screenName, { 
        barcode: `${data}`, 
        productName: `${stock[data].product_name}`, 
        price: `${stock[data].SellingPriceUnit}`,
        activate: true
      });
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: "#000000cd"
  },
});
