import { View, Text, TextInput, TouchableOpacity, Pressable } from "react-native";
import React from "react"

//inventory app
export default class LoginScreen extends React.Component {
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
            <View>
                <View><Text>Barcode Scanner here</Text></View>
                <View>
                    <View>
                        <TextInput
                          style={{}}
                          placeholder="Enter barcode number"
                          placeholderTextColor="black"
                          editable={true}
                          value={this.state.barcodeNumber}
                          onChangeText={(barcodeNumber) => this.setState({ barcodeNumber })}
                        />
                        <TextInput
                          style={{}}
                          placeholder="Enter product name"
                          placeholderTextColor={"black"}
                          editable={true}
                          value={this.state.productName}
                          keyboardType={"visible-password"}
                          onChangeText={(productName) => this.setState({ productName })}
                        />
                        <TextInput
                          style={{}}
                          placeholder="Enter quantity"
                          placeholderTextColor={"black"}
                          editable={true}
                          value={this.state.quantity}
                          keyboardType={"numeric"}
                          onChangeText={(quantity) => this.setState({ quantity })}
                        />
                        <TextInput
                          style={{}}
                          placeholder="Enter minimum level "
                          placeholderTextColor={"black"}
                          editable={true}
                          value={this.state.minLevel}
                          keyboardType={"numeric"}
                          onChangeText={(minLevel) => this.setState({ minLevel })}
                        />
                        <TextInput
                          style={{}}
                          placeholder="Enter price per unit "
                          placeholderTextColor={"black"}
                          editable={true}
                          value={this.state.pricePerUnit}
                          keyboardType={"numeric"}
                          onChangeText={(pricePerUnit) => this.setState({ pricePerUnit })}
                        />
                    </View>
                    <TouchableOpacity>
                        <Text>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


