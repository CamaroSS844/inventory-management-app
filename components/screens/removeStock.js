import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React from "react";
import { connect } from "react-redux";
import { showMessage, hideMessage } from "react-native-flash-message";
import { getItem, addNewProducts } from "../redux/productsListSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cancel, check } from "./newProduct";

const barcode = <MaterialCommunityIcons name="line-scan" size={170} />

//sorting according to quantity
//date of adding inventory
///date to assist with reordering


//inventory app
class RemoveProduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            barcodeNumber: "123456",
            productName: "",
            quantity: "10",//or all for every thing
            Reason: "too big"
        }
    }

    popUP = (obj) => {
        Alert.alert(
          "Enter password to confirm action",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Confirm",
              onPress: () => this.props.remove(this.state.barcodeNumber),
            },
          ]
        );
        showMessage({
            message: `  Saved!`,
            type: "danger",
            autoHide: true,
            icon: () => check
          });
    }


    handleConfirm = () => {
        value = this.props.getItem(this.state.barcodeNumber);
        if (typeof(value) != "object"){
            showMessage({
                message: `  ${this.state.barcodeNumber} does not exist`,
                description: `  Check for any typos or rescan the barcode`,
                type: "danger",
                autoHide: true,
                icon: () => cancel
              });
        }
        else if (typeof(value) != "object"){
            this.props.popUP(obj);
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
                          onChangeText={(barcodeNumber) => this.setState({ barcodeNumber })}
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
                      <TouchableOpacity style={styles.button} onPress={() => this.handleConfirm()}>
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
    getItem
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

