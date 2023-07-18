import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React from "react";
import { connect } from "react-redux";
import { showMessage, hideMessage } from "react-native-flash-message";
import { getItem, addNewProducts, remove } from "../redux/productsListSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cancel, check } from "./newProduct";
import { isInStock, checkFields } from "./newProduct";

const barcode = <MaterialCommunityIcons name="line-scan" size={170} />

//sorting according to quantity
//date of adding inventory
///date to assist with reordering
//age analysis


//inventory app
class RemoveProduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            barcodeNumber: "1234",
            productName: "music",
            quantity: "10",//or all for every thing
            Reason: "hello its me",
            instock: false
        }
    }

    autofill = (barcode) => {
      value = isInStock(barcode, this.props.inventory)
      if(!value){
        this.setState({
          productName: "",
          instock: false
      })
      this.setState({instock: value})
      return null
      }
      this.setState({
        productName: value.productName,
        instock: value
      })
    }

    popUP = (obj) => {
        Alert.alert(
          `Are you sure you want to remove `,
          "this item",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Confirm",
              onPress: () => {
                this.props.remove({barcode: this.state.barcodeNumber, quantity: this.state.quantity})
                showMessage({
                  message: `  Saved!`,
                  type: "success",
                  autoHide: true,
                  icon: () => check
                })
              },
            },
          ]
        );
    }


    handleConfirm = (obj) => {
        value = isInStock(this.state.barcodeNumber, this.props.inventory);
        if (typeof(value) != "object"){
            showMessage({
                message: `  Barcode ${this.state.barcodeNumber} does not exist`,
                description: `  Check for any typos or rescan the barcode`,
                type: "danger",
                autoHide: true,
                duration: 10000,
                icon: () => cancel
              });
        }
        else{
            this.popUP(value);
        }
    }

    render(){
        return (
          <View style={styles.Container}>
                <View style={{backgroundColor: "white", borderRadius: 20, marginBottom: -60, zIndex: 1}}>
                  {barcode}
                </View>
                <View style={styles.main}>
                  <View style={{width: "100%", display: "flex", alignItems: "center"}}>
                       <TextInput
                          style={styles.input}
                          placeholder="Enter Barcode"
                          placeholderTextColor={"grey"}
                          editable={true}
                          value={this.state.barcodeNumber}
                          keyboardType={"visible-password"}
                          onChangeText={(barcodeNumber) => {
                            this.setState({ barcodeNumber })
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
                          placeholder="Enter quantity"
                          placeholderTextColor={"grey"}
                          editable={true}
                          value={this.state.quantity}
                          keyboardType={"numeric"}
                          onChangeText={(quantity) => this.setState({ quantity })}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="Explain why it was removed "
                          placeholderTextColor={"grey"}
                          editable={true}
                          value={this.state.Reason}
                          keyboardType={"numeric"}
                          onChangeText={(Reason) => this.setState({ Reason })}
                        />
                    </View>
                    <View style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-evenly"}}>
                      <TouchableOpacity style={{...styles.button, backgroundColor: "#bb0606"}} onPress={
                        () => {
                            this.setState({
                                barcodeNumber: "",
                                productName: "",
                                quantity: "",
                                minLevel: "",
                                Reason: ""
                            })
                        }}>
                          <Text style={{color: "white"}}>Clear</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={() => {
                        checkFields({...this.state}, this.handleConfirm)
                        }}>
                          <Text style={{color: "white"}}>Confirm</Text>
                      </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    inventory: state.inventoryList.value
  })
  
const mapDispatchToProps = () => ({
  addNewProducts,
  getItem,
  remove
})
  
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(RemoveProduct)


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

