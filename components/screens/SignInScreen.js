import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import React from "react"

//inventory app
export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            password: "",
        }
    }

    render(){
        return (
            <View style={styles.Container}>
            <View style={styles.main}>
                <View style={{width: "100%", display: "flex", alignItems: "center"}}>
                    <TextInput
                          style={styles.input}
                          placeholder="Enter your full name"
                          placeholderTextColor="black"
                          editable={true}
                          value={this.state.name}
                          onChangeText={(name) => this.setState({ name })}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="Enter your password"
                          placeholderTextColor={"black"}
                          editable={true}
                          value={this.state.password}
                          keyboardType={"visible-password"}
                          onChangeText={(password) => this.setState({ password })}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate("Dashboard")}}>
                        <Text style={styles.item}>Login</Text>
                    </TouchableOpacity>
                    <View>
                    <Pressable onPress={() => {this.props.navigation.navigate("sign in")}}>
                            <Text style={{color: "#476C6C", fontWeight: "bold", fontSize: 15, paddingTop: 20}}>
                                Forgot password?
                            </Text>
                        </Pressable>
                    </View>
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
        marginBottom: 40,
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
        alignItems: "center"
    }
})

