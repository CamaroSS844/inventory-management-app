import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { remove } from "../redux/productsListSlice";
import { check, isInStock } from "./newProduct";
import { showMessage, hideMessage } from "react-native-flash-message";
import { cancel } from "./newProduct";

const barcode = <MaterialCommunityIcons name="line-scan" size={170} />



//inventory app
class ProcessSale extends React.Component {
    constructor(props){
        super(props);
        this.pricePlMessage = "Enter Price per unit"
        this.quantityPlMessage = "Enter quantity"
        this.check = isInStock(this.props.currentBarcode, this.props.inventory)

        this.state = {
            barcodeNumber: !this.check? "" : this.props.currentBarcode,
            productName: !this.check? "": this.check.productName,
            quantity: "",
            pricePerUnit: "",
            instock: false,
            pricePlaceholder: !this.check? this.pricePlMessage: `Current price per unit ----> ${this.check.pricePerUnit}`,
            quantityPlaceholder: !this.check? this.quantityPlMessage : `Items in stock ---> ${this.check.quantity}`,
            cart: {}
        }
    } 
    

    clear = () => {
      this.setState({
        barcodeNumber: "",
        productName: "",
        quantity: "",
        minLevel: "",
        pricePerUnit: "",
        pricePlaceholder: this.pricePlMessage,
        quantityPlaceholder: this.quantityPlMessage,
      })
    }

    preliminaryChecks(){
      let barcod = this.state.barcodeNumber
      quantity = parseInt(this.state.quantity)

      //check if barcode exists in the database
      if (!(this.state.barcodeNumber in this.props.inventory)){
        showMessage({
          message: `  Barcode ${this.state.barcodeNumber} does not exist`,
          description: `  Check for any typos or rescan the barcode`,
          type: "danger",
          autoHide: true,
          duration: 5000,
          icon: () => cancel
        });
        return false
      }
      quantInStock = parseInt(this.props.inventory[barcod].quantity)

      //check if quantity entered is in stock
      if(quantity){
        if (quantInStock >= quantity){

          showMessage({
            message: `  Success`,
            type: "success",
            autoHide: true,
            duration: 2000,
            icon: () => check
          });
          return true
        }else if(quantInStock < quantity){
          showMessage({
            message: `  Not Enough ${this.state.productName} left in Stock`,
            description: `  ${quantInStock} left`,
            type: "warning",
            autoHide: true,
            duration: 5000,
            icon: () => cancel
          });
          return false
        }
      }
    }


    nextItem = (bool) => {
      //if pass then = true if failed  = false
      passed = this.preliminaryChecks()
      if (passed){
        let barcod = this.state.barcodeNumber
        currentItem = {};
        currentItem[barcod] = {
        barcodeNumber: barcod,
        productName: this.state.productName,
        quantity: this.state.quantity,
        pricePerUnit: this.props.inventory[barcod].pricePerUnit,
      };
        list = this.state.cart
        this.setState({
          cart: {...this.state.cart, ...currentItem}})
        }
        this.clear()
        if(bool){
          return currentItem
        }
        return false
      }

      handleDone = () => {
        value = false
        if (this.state.barcodeNumber){
          value = this.nextItem(true)
        }
        if (value)  this.props.navigation.push("Receipt", {cart: {...this.state.cart, ...value}})
        else this.props.navigation.push("Receipt", {cart: this.state.cart})

        this.clear()
      }
    

    autofill = (barcode) => {
      value = isInStock(barcode, this.props.inventory)
      if(!value){
        this.setState({
          productName: "",
          pricePlaceholder: this.pricePlMessage,
          quantityPlaceholder: this.quantityPlMessage,
          instock: false
      })
      this.setState({instock: value})
      return null
      }
      this.setState({
        productName: value.productName,
        pricePlaceholder: `Price per unit ----> $${value.pricePerUnit}`,
        quantityPlaceholder: `Items in stock ---> ${value.quantity}`,
        instock: value
      })
    } 

    render(){
        return (
          <View style={styles.Container}>
                <View 
                  style={{backgroundColor: "white", borderRadius: 20, marginBottom: -60, zIndex: 1}}
                  onPress={() => this.props.navigation.push("BarcodeScreen")}
                >
                  {barcode}
                </View>
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
                          placeholder="Product name"
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
                          placeholder={this.state.pricePlaceholder}
                          placeholderTextColor={"black"}
                          editable={false}
                          value={this.state.pricePerUnit}
                          keyboardType={"numeric"}
                          onChangeText={(pricePerUnit) => this.setState({ pricePerUnit })}
                        />
                    </View>
                    <View style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-evenly"}}>
                      <TouchableOpacity style={{...styles.button, backgroundColor: "#bb0606"}} onPress={() => {
                        this.clear()
                      }}>
                          <Text style={{color: "white"}}>Clear</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={() => this.nextItem()}>
                          <Text style={{color: "white"}}>Next item</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{...styles.button, marginTop: 20}} onPress={() => {
                        this.handleDone()
                    }
                    }>
                          <Text style={{color: "white"}}>Done</Text>
                      </TouchableOpacity>
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
  remove
})

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(ProcessSale)



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

  },
  item: {
      color: "white"
  },
  para: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 20
  }
})

