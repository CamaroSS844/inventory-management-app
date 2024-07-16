import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Pressable, ActivityIndicator, Alert } from "react-native";
import React, { useState } from "react";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { showMessage, hideMessage } from "react-native-flash-message";
import RadioButtonRN from 'radio-buttons-react-native';
import WavyHeader from "./wavyHeader";
import { ScrollView } from "react-native";
import {database} from "../../config/firebase";
import { FieldValue, addDoc, collection, collectionGroup, doc, setDoc, updateDoc, writeBatch } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { currentStock } from "../redux/productsListSlice";

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
    const [productName, setProductName] = useState(props.route.params.productName);
    const [loading, setLoading] = useState(false);
    const [supplierName, setSupplierName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [sellingPrice, setSellingPrice] = useState(props.route.params.price);
    const [purchaseCurrency, setPurchaseCurrency] = useState("RAND");//might want to let the person decide which currency is their default and then add alternative currencies
    const [salesCurrency, setSalesCurrency] = useState("RAND");//might want to let the person decide which currency is their default and then add alternative currencies
    const [barcode, setBarcode] = useState(props.route.params.barcode);
    let dispatch = useDispatch();

    let stock = useSelector(state => state.inventoryList.value);
    
    console.log(`product redux ${JSON.stringify(stock)}`);

    const [currentAmount, setCurrentAmount] = useState(stock[barcode] ? stock[barcode].quantity : 0);

    if (stock[barcode]){
      console.log(`stock: ${JSON.stringify(stock[barcode].quantity)}`);
    }


    const checkProduct = (value) => {
      setBarcode(value);
      if (stock[value]){
        setProductName(stock[value].product_name);
        setSellingPrice(stock[value].SellingPriceUnit);
        setPurchasePrice(stock[value].PurchasePriceunit);
        setCurrentAmount(parseFloat(stock[value].quantity));
      } else {
        setProductName("");
        setSellingPrice("");
        setPurchasePrice("");
        setSupplierName("");
        setQuantity(0);
      }
    }

    const checkFields = () => {
      setLoading(true);
      if (barcode === "" || productName === "" || supplierName === "" || quantity === "" || purchasePrice === "" || sellingPrice === "" || purchaseCurrency === "" || salesCurrency === ""){
        setLoading(false);
        showMessage({
          message: "Please fill in all fields",
          description: "All fields are required",
          type: 'danger',
          autoHide: true,
          duration: 5000,
          icon: () => cancel,
        });
      } else if (barcode in stock && stock[barcode].product_name != productName ){
        setLoading(false);
        Alert.alert(
          "Product name mismatch",
          `The barcode ${barcode} already exists in the inventory as ${stock[barcode].product_name}. Do you want to update the product name to ${productName}?`,
          [
            {
              text: "No",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Yes", onPress: () => addProduct() }
          ]
        );
      }else {
        addProduct();
      }
    }

    const addProduct = async () => {
      const time = new Date().toString();

      const purchasesPayload = {
        product_name: productName,
        supplier: supplierName,
        quantity: parseFloat(quantity),
        barcode: barcode,
        PurchasePriceunit: purchasePrice,
        purchaseCurrency: purchaseCurrency,
        received_at: time
      };
      console.log(`current amount: ${currentAmount}`)
      const stockPayload = {
        product_name: productName,
        quantity: (parseFloat(quantity) + currentAmount),
        barcode: barcode,
        SellingPriceUnit: sellingPrice,
        salesCurrency: salesCurrency,
        received_at: time
      }; 


    const batch = writeBatch(database); 

    const purchase = doc(database, `CompaniesList/list/Brainbox/Purchases`);
    batch.update(purchase, {[time]: purchasesPayload});

    const stock = doc(database, "CompaniesList/list/Brainbox/Stock");
    batch.update(stock, {[barcode]: stockPayload});


    try {
        await batch.commit().then(() => {
            dispatch(currentStock(stockPayload));
        }).then(() => {
          setLoading(false);
          console.log("Batch write successful");
          props.navigation.replace('new Product', {barcode: ""});
        });
      }
       catch (e) {
          setLoading(false);
          console.log(e);
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
                            onChangeText={(value) => checkProduct(value)}
                          />
                          <Pressable style={{height: '90%', paddingLeft: 10}} onPress={() => props.navigation.replace('BarcodeScreen', {screenName: "new Product" } )}>
                            {barcodeIcon}
                          </Pressable>
                        </View>
                       
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
    borderRadius: 5,
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
  },
  loader: {
    position: "absolute", 
    height: "100%", 
    width: "100%", 
    backgroundColor: "#00000047", 
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  }
})


