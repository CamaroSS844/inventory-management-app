import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const barcode = <MaterialCommunityIcons name="line-scan" size={170} />

//inventory app
export default class AddNewProduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            barcodeNumber: "",
            productName: "",
            quantity: "",
            minLevel: "",
            pricePerUnit: ""
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
                          placeholder="Enter product name"
                          placeholderTextColor={"black"}
                          editable={true}
                          value={this.state.productName}
                          keyboardType={"visible-password"}
                          onChangeText={(productName) => this.setState({ productName })}
                        />
                         <TextInput
                          style={styles.input}
                          placeholder="Enter barcode number"
                          placeholderTextColor="black"
                          editable={true}
                          value={this.state.barcodeNumber}
                          onChangeText={(barcodeNumber) => this.setState({ barcodeNumber })}
                        />
                        
                        <TextInput
                          style={styles.input}
                          placeholder="Enter quantity"
                          placeholderTextColor={"black"}
                          editable={true}
                          value={this.state.quantity}
                          keyboardType={"numeric"}
                          onChangeText={(quantity) => this.setState({ quantity })}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="Enter price per unit "
                          placeholderTextColor={"black"}
                          editable={true}
                          value={this.state.pricePerUnit}
                          keyboardType={"numeric"}
                          onChangeText={(pricePerUnit) => this.setState({ pricePerUnit })}
                        />
                    </View>
                    <View style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-evenly"}}>
                      <TouchableOpacity style={{...styles.button, backgroundColor: "#bb0606"}}>
                          <Text style={{color: "white"}}>Clear</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button}>
                          <Text style={{color: "white"}}>Next item</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{...styles.button, marginTop: 20}} onPress={() => this.props.navigation.navigate("Receipt")}>
                          <Text style={{color: "white"}}>Done</Text>
                      </TouchableOpacity>
                </View>
            </View>
        )
    }
}

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
