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

function IdGen(transact){
  //generate ids for sales purchases and other transactions.
  //will be worked on accordingly
  //first 2 letters for company name id, next letter transact type then transact number
  switch(transact){
    case sale:
      return 'COS001';
    default:
      return null
  }
}
function CustomHeader(){

  return (
    <View style={styles.customHeader}>
        <Pressable style={{padding: 20}}>
          {backIcon}
        </Pressable>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: '900', padding: 20}}>ReStock</Text>
    </View>
  )
}


//inventory app
export default function AddNewProduct(){
    const [productName, setProductName] = useSelector(() =>  "");
    const [category, setCategory] = useSelector(() =>  "");
    const [supplierName, setSupplierName] = useSelector(() => "");
    const [quantity, setQuantity] = useSelector(() => "");
    const [barcode, setBarcode] = useSelector(() => "");
    const shoppingCart = [];

    
        return (
          <View style={styles.Container}>
          <WavyHeader customStyles={styles.svgCurve}/>
          <CustomHeader />
          <ScrollView>
                <View style={styles.main}>
                  <Text style={{fontSize: 25,fontFamily: 'serif', paddingLeft: 10}}>Details</Text>

                        <Text style={{fontFamily: 'serif', paddingLeft: 10, paddingTop: 10}}>Category<Text style={{color: "red"}}>*</Text></Text>
                        <TextInput
                          style={styles.input}
                          placeholderTextColor="grey"
                          editable={true}
                          value={category}
                          autoFocus= { true }
                          onChangeText={(name) => {
                            setCategory(name);
                            //autofill(name);
                          }}
                        />
                       
                       <Text style={{fontFamily: 'serif', paddingLeft: 10}}>Product Name<Text style={{color: "red"}}>*</Text></Text>
                       <TextInput
                          style={styles.input}
                          placeholderTextColor={"grey"}
                          editable={true}
                          value={productName} 
                          keyboardType={"visible-password"}
                          onChangeText={(customer) => setSupplierName(customer)}
                        />
                        
                        <Text style={{fontFamily: 'serif', paddingLeft: 10}}>Barcode<Text style={{color: "red"}}>*</Text></Text>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                          <TextInput
                            style={{...styles.input, width: "80%"}}
                            placeholderTextColor={"grey"}
                            editable={true}
                            value={barcode}
                            keyboardType={"visible-password"}
                            onChangeText={(value) => setBarcode(value)}
                          />
                          <Pressable style={{height: '90%', paddingLeft: 10}}>
                            {barcodeIcon}
                          </Pressable>
                        </View>
                        
                        <Text style={{fontFamily: 'serif', paddingLeft: 10}}>Supplier Name<Text style={{color: "red"}}>*</Text></Text>
                        <TextInput
                          style={styles.input}
                          placeholderTextColor={"grey"}
                          editable={false}
                          value={supplierName}
                          onChangeText={(customer) => setProductName(customer)}
                        />

                        <Text style={{fontFamily: 'serif', paddingLeft: 10}}>Quantity<Text style={{color: "red"}}>*</Text></Text>
                        <TextInput
                          style={styles.input}
                          placeholderTextColor = {"grey"}
                          editable={false}
                          value={''}
                          keyboardType={"numeric"}
                          onChangeText={() => ''}
                        />

                        <Text style={{fontFamily: 'serif', paddingLeft: 10}}>Purchase price<Text style={{color: "red"}}>*</Text></Text>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                          <TextInput
                            style={{...styles.input, width: "35%"}}
                            placeholderTextColor={"grey"}
                            editable={true}
                            value={barcode}
                            keyboardType={"numeric"}
                            onChangeText={(value) => setBarcode(value)}
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

                        <Text style={{fontFamily: 'serif', paddingLeft: 10}}>Selling Price<Text style={{color: "red"}}>*</Text></Text>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                          <TextInput
                            style={{...styles.input, width: "35%"}}
                            placeholderTextColor={"grey"}
                            editable={true}
                            value={barcode}
                            keyboardType={"numeric"}
                            onChangeText={(value) => setBarcode(value)}
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

                        <TouchableOpacity style={styles.button}  onPress={() => null}>
                          <Text style={styles.item}>Save</Text>
                      </TouchableOpacity>
                    </View>
                </ScrollView>
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
      padding: 10,
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


