/*
the new products screen enters new products into database
available features on this screen are as follows
> you are able to scan or manually type the barcode into the input
> as you type the barcode the system checks if there is another product
   in the database with the same barcode. 
   *if it is there it will automaticallyfill in the name for you and 
   highlight the current settings for quantity, minimum level and price per unit.
   *whatever value you will type into the quantity, minimum level and price pernit fields
   will increment the current value that is
   if it dsplays current quantity ----> 20
   and you type in 23, total quantiy in the database becomes 43 not 23
 */
 


import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { showMessage} from "react-native-flash-message";
import { connect } from "react-redux";
import { addNewProducts } from "../redux/productsListSlice";
import { logStocking } from "../redux/newScreenLogSlice";
import { logProduct } from "../redux/productNameSlice";
import moment from "moment/moment";

const barcode = <MaterialCommunityIcons name="line-scan" size={170} />
export const cancel = <MaterialIcons name="cancel" size={20} color={"white"}/>
export const check = <MaterialIcons name="check-circle" size={20} color={"white"}/>

//inventory app

export const checkFields = (obj, successFunc) => {
  isComplete = true;
  Object.values(obj).forEach(function(val){
    if(val === ""){
      isComplete = false;
    }
  })
   if(!isComplete){
    showMessage({
      message: "  Please complete all fields!",
      type: "danger",
      autoHide: true,
      icon: () => cancel
    });
  }else {
    successFunc(obj);
  }
}

export const isInStock = (action, state) => {
  if(Object.keys(state).length > 0){
    doesBarcodeExist = (action in state);
    if(doesBarcodeExist){
      value = state[action];
      return value
    }
  }
  return false
}


class AddNewProduct extends React.Component {
    constructor(props){
        super(props);
        this.quantityPlMessage = "Enter quantity"
        this.minLevelPlMessage = "Enter minimum level"
        this.pricePlMessage = "Enter Price per unit"
        this.check = isInStock(this.props.currentBarcode, this.props.inventory)

        this.state = {
            barcodeNumber: !this.check? "" : this.props.currentBarcode,
            productName: !this.check? "": this.check.productName,
            quantity: "",
            minLevel: "",
            pricePerUnit: "",
            quantityPlaceholder: !this.check? this.quantityPlMessage : `Items in stock ---> ${this.check.quantity}` ,
            minLevelPlaceholder: !this.check? this.minLevelPlMessage : `Current minimum level ---> ${this.check.minLevel}`,
            pricePlaceholder: !this.check? this.pricePlMessage: `Current price per unit ----> ${this.check.pricePerUnit}`,
            instock: false
        }
    }

    autofill = (barcode) => {
      value = isInStock(barcode, this.props.inventory)
      if(!value){
        this.setState({
          productName: "",
          quantityPlaceholder: this.quantityPlMessage,
          minLevelPlaceholder: this.minLevelPlMessage,
          pricePlaceholder: this.pricePlMessage,
          instock: false
      })
      this.setState({instock: value})
      return null
      }
      this.setState({
        productName: value.productName,
        quantityPlaceholder: `Items in stock ---> ${value.quantity}`,
        minLevelPlaceholder: `Current minimum level ---> ${value.minLevel}`,
        pricePlaceholder: `Current price per unit ----> ${value.pricePerUnit}`,
        instock: value
      })
    } 

    logPrep = () => {

      /*
        action.payload format
        "2023-07-14": {
          "12345":{
            dateUI: "14th July 2023, 2:41:42 pm",
            quantity: "10",
            category: "restock"
          },
          "1234567":{ 
            dateUI: "14th July 2023, 2:41:42 pm",
            quantity: "2",
            category: "New Stock"
          },
        }
      */
      this.props.logStocking({
        [moment().format()]: {
          [this.state.barcodeNumber]: {
            dateUI: moment().format('Do MMMM YYYY, h:mm:ss a'),
            quantity: this.state.quantity,
            category: this.state.instock? 'restock': 'New Stock'
          }
        }
      })
      this.props.logProduct({[this.state.barcodeNumber]: this.state.productName})

    }

    handleConfirm = () => {
      obj  = {
        barcodeNumber: this.state.barcodeNumber,
        productName: this.state.productName,
        quantity: !this.state.instock? this.state.quantity: `${parseInt(this.state.quantity) + parseInt(this.state.instock.quantity) }`,
        minLevel: this.state.minLevel,
        pricePerUnit: this.state.pricePerUnit
      }
      checkFields(obj, this.FieldsAreComplete)
    }

    FieldsAreComplete = (obj) => {
      currentItem = {};
      currentItem[this.state.barcodeNumber] = {...obj, dateUI: moment().format('Do MMMM YYYY, h:mm:ss a'), dateCode: moment().format()};
      this.props.addNewProducts(
        {...currentItem}
      )

      this.logPrep()

      showMessage({
        message: "   Saved!",
        type: "success",
        autoHide: true,
        icon: () => check
      });
  }

    render(){
        return (
          <View style={styles.Container}>
                <Pressable 
                style={{backgroundColor: "white", borderRadius: 20, marginBottom: -60, zIndex: 1}}
                onPress={() => this.props.navigation.push("BarcodeScreen")}
                >
                  {barcode}
                </Pressable>
                <View style={styles.main}>
                  <View style={{width: "100%", display: "flex", alignItems: "center"}}>
                        <TextInput
                          style={styles.input}
                          placeholder="Enter barcode number"
                          placeholderTextColor="grey"
                          editable={true}
                          value={this.state.barcodeNumber}
                          onChangeText={(barcodeNumber) => {
                            this.setState({ barcodeNumber });
                            this.autofill(barcodeNumber);
                          }}
                        />
                       <TextInput
                          style={styles.input}
                          placeholder="Enter product name"
                          placeholderTextColor={"grey"}
                          editable={true}
                          value={this.state.productName}
                          keyboardType={"visible-password"}
                          onChangeText={(productName) => this.setState({ productName })}
                        />
                        
                        
                        <TextInput
                          style={styles.input}
                          placeholder={this.state.quantityPlaceholder}
                          placeholderTextColor={"grey"}
                          editable={true}
                          value={this.state.quantity}
                          keyboardType={"numeric"}
                          onChangeText={(quantity) => this.setState({ quantity })}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder={this.state.minLevelPlaceholder}
                          placeholderTextColor={"grey"}
                          editable={true}
                          value={this.state.minLevel}
                          keyboardType={"numeric"}
                          onChangeText={(minLevel) => this.setState({ minLevel })}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder={this.state.pricePlaceholder}
                          placeholderTextColor={"grey"}
                          editable={true}
                          value={this.state.pricePerUnit}
                          keyboardType={"numeric"}
                          onChangeText={(pricePerUnit) => this.setState({ pricePerUnit })}
                        />
                    </View>
                    <View style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-evenly"}}>
                      <TouchableOpacity style={{...styles.button, backgroundColor: "#bb0606"}} onPress={() => this.setState({
                        barcodeNumber: "",
                        productName: "",
                        quantity: "",
                        minLevel: "",
                        pricePerUnit: "",
                        quantityPlaceholder: this.quantityPlMessage,
                        minLevelPlaceholder: this.minLevelPlMessage,
                        pricePlaceholder: this.pricePlMessage
                      })}>
                          <Text style={{color: "white"}}>Clear</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={() => {
                        this.handleConfirm()}
                      }>
                          <Text style={{color: "white"}}>Confirm</Text>
                      </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => ({
  inventory: state.inventoryList.value,
  currentBarcode: state.currentBCS.value
})

const mapDispatchToProps = () => ({
  addNewProducts,
  logStocking,
  logProduct
})

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(AddNewProduct)

const styles = StyleSheet.create({
  Container: {
      backgroundColor: "#CF8DB9", 
      height: "100%",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center"
  },
  main: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#D9D9D9",
      width: "100%",
      height: "78%",
      borderTopRightRadius: 50,
      borderTopLeftRadius: 50,
      paddingTop: 70
  },
  input : {
      marginBottom: 30,
      backgroundColor: "white",
      width: "70%",
      padding: 10,
      borderRadius: 20
  },
  button: {
      backgroundColor: "#476C6C",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 90,
      height: 35,
      borderRadius: 15

  }
})