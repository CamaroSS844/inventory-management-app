import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Pressable } from "react-native";
import React, { useState } from "react";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { showMessage, hideMessage } from "react-native-flash-message";
import { removeBarcode } from "../redux/currentBarcodeSlice";
import RadioButtonRN from 'radio-buttons-react-native';
import WavyHeader from "./wavyHeader";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";

const backIcon = <FontAwesome name="chevron-left" size={25} color="#fff"/>
const barcodeIcon = <MaterialCommunityIcons name="barcode-scan" size={40} />
const sale = 'sale'
const overallWidth = Dimensions.get('window').width;

const data = [
  {
    label: 'USD'
   },
   {
    label: 'RAND'
   }, 
   {
    label: 'ZWL'
   }, 

  ];

function CustomHeader(){

  return (
    <View style={styles.customHeader}>
        <Pressable style={{padding: 20}}>
          {backIcon}
        </Pressable>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: '900', padding: 20}}>Cart</Text>
    </View>
  )
}


//inventory app
export default function CheckoutItemScreen(props){
    const [productName, setProductName] = useState(props.route.params.productName);
    const [price, setPrice] = useState(props.route.params.price);
    const [quantity, setQuantity] = useState("");
    const [qField, setQField] = useState(props.route.params.activate);
    const [barcode, setBarcode] = useState(props.route.params.barcode);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState({});
    
    let stock = useSelector(state => state.inventoryList.value);
    

    const check = (barcode) => {
      setBarcode(barcode)
      if (barcode in stock){
        setQField(true);
        setProductName(stock[barcode].product_name);
        setPrice(stock[barcode].SellingPriceUnit);
        return true;
      }
      setQField(false);
      setProductName("");
      setPrice("");
      return false;
    }

    const confirmEntry = () => {
      if(barcode in stock && quantity != "" && quantity > 0){
        remainingStock = parseFloat(stock[barcode].quantity) - quantity;
        if(remainingStock < 0){
          showMessage({
            message: "Insufficient stock",
            type: "danger",
          });
          return;
        } else {
          setCart({...cart, 
            [barcode]: {
              product_name: productName, 
              price: price, 
              quantity: quantity
            }});
          showMessage({
            message: "Added to cart",
            type: "success",
          });
          return;
        }
      }
    }
    
        return (
          <View style={styles.Container}>
          <WavyHeader customStyles={styles.svgCurve}/>
          <CustomHeader />
          <ScrollView>
                <View style={styles.main}>
                        <Text style={{fontFamily: 'serif', paddingLeft: 10, paddingTop: 10}}>Barcode<Text style={{color: "red"}}>*</Text></Text>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                          <TextInput
                            style={{...styles.input, width: "80%"}}
                            placeholderTextColor={"grey"}
                            editable={true}
                            value={barcode}
                            keyboardType={"visible-password"}
                            onChangeText={(value) => check(value)}
                          />
                          <Pressable style={{height: '90%', paddingLeft: 10}} onPress={() => props.navigation.push('BarcodeScreen', {screenName: "checkOutItemScreen" })}>
                            {barcodeIcon}
                          </Pressable>
                        </View>
                       
                       <Text style={{fontFamily: 'serif', paddingLeft: 10}}>Product Name<Text style={{color: "red"}}>*</Text></Text>
                       <TextInput
                          style={styles.input}
                          placeholderTextColor={"grey"}
                          editable={false}
                          value={productName} 
                          keyboardType={"visible-password"}
                          onChangeText={(item) => setProductName(item)}
                        />

                        <Text style={{fontFamily: 'serif', paddingLeft: 10}}>Quantity<Text style={{color: "red"}}>*</Text></Text>
                        <TextInput
                          style={styles.input}
                          placeholderTextColor = {"grey"}
                          value={''}
                          editable={qField}
                          keyboardType={"numeric"}
                          onChangeText={value => setQuantity(value)}
                        />

                        <Text style={{fontFamily: 'serif', paddingLeft: 10}}>Price<Text style={{color: "red"}}>*</Text></Text>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                          <TextInput
                            style={{...styles.input, width: "35%"}}
                            placeholderTextColor={"grey"}
                            placeholder={"**autoset**"}
                            value={price}
                            editable={false}
                            keyboardType={"numeric"}
                            onChangeText={(value) => setPrice(value)}
                          />
                          <RadioButtonRN
                            data={data}
                            selectedBtn={(e) => console.log(e)}
                            style = {{display: 'flex', flexDirection: 'row', width: "25%"}}
                            icon={
                              <FontAwesome
                                name="check-circle"
                                size={20}
                                color="#2c9dd1"
                              />
                            }
                            box={false}
                            textStyle={{paddingLeft: 5}}
                          />
                        </View>

                        <TouchableOpacity style={styles.button}  onPress={() => confirmEntry()}>
                          <Text style={styles.item}>Confirm</Text>
                      </TouchableOpacity>
                    </View>
                </ScrollView>
                {
                loading?
                  <View style={styles.loader}>
                    <ActivityIndicator animating={loading} size="large" color="purple"/>
                  </View>
                : null
                }
            </View>
        )
}


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    display: 'flex',
    alignItems: 'center'
  },
  customHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 100, 
    width: "100%",
    // padding: 30,
    paddingTop: 30,
    backgroundColor: '#520bb0'
  },
  main: {
    marginTop: 30,
    backgroundColor: '#fff',
    color: '#000',
    width: overallWidth * 0.95,
    display: 'flex',
    justifyContent: 'flex-start',
    padding: 15,
    shadowColor: "#000",
    elevation: 6,
    borderRadius: 5
  },
  input : {
      marginBottom: 30,
      width: "95%",
      padding: 8,
      borderRadius: 20,
      borderBottomColor: 'purple',
      borderBottomWidth: 1,
      color: '#000'
  },
  button: {
    backgroundColor: "purple",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: overallWidth * 0.8,
    height: 45,
    borderRadius: 30,
    marginBottom: 40,
    marginTop: 20,
    marginLeft: 20
},
item: {
    color: "white",
    fontSize: 20,
    fontWeight: 'bold'
},
  para: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 20
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  }
})


