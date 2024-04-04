import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Pressable } from "react-native";
import React, { useState } from "react";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { showMessage, hideMessage } from "react-native-flash-message";
import { removeBarcode } from "../redux/currentBarcodeSlice";
import RadioButtonRN from 'radio-buttons-react-native';
import WavyHeader from "./wavyHeader";
import { ScrollView } from "react-native";
import { database } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";

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
        <Text style={{color: '#fff', fontSize: 20, fontWeight: '900', padding: 20}}>New Product</Text>
    </View>
  )
}


//inventory app
export default function AddNewProduct(props){
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [supplierName, setSupplierName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [purchaseCurrency, setPurchaseCurrency] = useState("");//might want to let the person decide which currency is their default and then add alternative currencies
    const [salesCurrency, setSalesCurrency] = useState("");//might want to let the person decide which currency is their default and then add alternative currencies
    const [barcode, setBarcode] = useState(props.route.params.barcode);

    const checkFields = () => {
      if (barcode === "" || category === "" || productName === "" || supplierName === "" || quantity === "" || purchasePrice === "" || sellingPrice === "" || purchaseCurrency === "" || salesCurrency === ""){
        showMessage({
          message: "Please fill in all fields",
          description: "All fields are required",
          type: 'danger',
          autoHide: true,
          duration: 5000,
          icon: () => cancel,
        });
      } else {
        addProduct();
      }
    }

    const addProduct = async () => {
      const docRef = await addDoc(collection(database, "products"), {
        name: productName,
        category: category,
        supplier: supplierName,
        quantity: quantity,
        barcode: barcode,
        PurchasePricePerUnit: purchasePrice,
        purchaseCurrency: purchaseCurrency,
        SellingPricePerUnit: sellingPrice,
        salesCurrency: salesCurrency
      });
    
      console.log("Document written with ID: ", docRef.id);
      if (docRef.id){
        showMessage({
          message: "Product added successfully",
          description: "You can now view the product in the inventory",
          type: 'success',
          autoHide: true,
          duration: 5000,
          icon: () => check,
        });
        props.navigation.replace('new Product', {barcode: ""});
      }
    }
        return (
          <View style={styles.Container}>
          <WavyHeader customStyles={styles.svgCurve}/>
          <CustomHeader />
          <ScrollView>
                <View style={styles.main}>
                  <Text style={{fontSize: 25,fontFamily: 'serif', paddingLeft: 10}}>Details</Text>
                    <Text style={{fontFamily: 'serif', color: 'grey'}}>//add popUp for auth and confirm</Text>


                        <Text style={{fontFamily: 'serif', paddingLeft: 10, paddingTop: 10}}>Barcode<Text style={{color: "red"}}>*</Text></Text>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                          <TextInput
                            style={{...styles.input, width: "80%"}}
                            placeholderTextColor={"grey"}
                            value={barcode}
                            keyboardType={"visible-password"}
                            onChangeText={(value) => setBarcode(value)}
                          />
                          <Pressable style={{height: '90%', paddingLeft: 10}} onPress={() => props.navigation.replace('BarcodeScreen', {screenName: "new Product" } )}>
                            {barcodeIcon}
                          </Pressable>
                        </View>

                        <Text style={{fontFamily: 'serif', paddingLeft: 10, paddingTop: 10}}>Category<Text style={{color: "red"}}>*</Text> initialise categories</Text>
                        <TextInput
                          style={styles.input}
                          placeholderTextColor="grey"
                          value={category}
                          onChangeText={(name) => {
                            setCategory(name);
                            //autofill(name);
                          }}
                        />
                       
                       <Text style={{fontFamily: 'serif', paddingLeft: 10}}>Product Name<Text style={{color: "red"}}>*</Text></Text>
                       <TextInput
                          style={styles.input}
                          placeholderTextColor={"grey"}
                          value={productName} 
                          keyboardType={"visible-password"}
                          onChangeText={(customer) => setProductName(customer)}
                        />
                        
                        <Text style={{fontFamily: 'serif', paddingLeft: 10}}>Supplier Name<Text style={{color: "red"}}>*</Text></Text>
                        <TextInput
                          style={styles.input}
                          placeholderTextColor={"grey"}
                          value={supplierName}
                          onChangeText={(customer) => setSupplierName(customer)}
                        />

                        <Text style={{fontFamily: 'serif', paddingLeft: 10}}>Quantity<Text style={{color: "red"}}>*</Text></Text>
                        <TextInput
                          style={styles.input}
                          placeholderTextColor = {"grey"}
                          value={quantity}
                          keyboardType={"numeric"}
                          onChangeText={value => setQuantity(value)}
                        />

                        <Text style={{fontFamily: 'serif', paddingLeft: 10}}>Purchase price/unit<Text style={{color: "red"}}>*</Text></Text>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                          <TextInput
                            style={{...styles.input, width: "35%"}}
                            placeholderTextColor={"grey"}
                            value={purchasePrice}
                            keyboardType={"numeric"}
                            onChangeText={(value) => setPurchasePrice(value)}
                          />
                          <RadioButtonRN
                            data={data}
                            selectedBtn={(e) => setPurchaseCurrency(e.label)}
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

                        <Text style={{fontFamily: 'serif', paddingLeft: 10}}>Selling price/unit<Text style={{color: "red"}}>*</Text></Text>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                          <TextInput
                            style={{...styles.input, width: "35%"}}
                            placeholderTextColor={"grey"}
                            value={sellingPrice}
                            keyboardType={"numeric"}
                            onChangeText={(value) => setSellingPrice(value)}
                          />
                          <RadioButtonRN
                            data={data}
                            selectedBtn={(e) => setSalesCurrency(e.label)}
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
                        <TouchableOpacity style={styles.button}  onPress={() => checkFields()}>
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
      marginBottom: 25,
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


