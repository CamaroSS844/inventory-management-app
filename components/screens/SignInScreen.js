import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet, Dimensions } from "react-native";
import { showMessage } from "react-native-flash-message";
import { cancel } from "./newProduct";
import WavyHeader from "./wavyHeader";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";

const overallWidth = Dimensions.get('window').width;

//inventory app
export default function SignIn(props){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false); 

    const onHandleLogin = () => {
        if (email !== "" && password !== ""){
            signInWithEmailAndPassword(auth, email, password)
                .then(() => console.log("Login success"))
                .catch((err) => {
                    console.log(email, password);
                    return Alert.alert("Login error", err.message)
                })
        }
    }

    return (
        <View style={styles.container}>
            <WavyHeader customStyles={styles.svgCurve} />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Login</Text>
            </View>
            <View style={{top: (Dimensions.get('window').height)/3}}>
            <View style={{width: "100%"}}>
                <TextInput
                      style={{...styles.input}}
                      placeholder="Enter your email"
                      placeholderTextColor="grey"
                      value={email}
                      onChangeText={(name) => setEmail(name)}
                    />
                    <TextInput
                      style={{...styles.input, marginBottom: 80}}
                      placeholder="Enter your password"
                      placeholderTextColor={"grey"}
                      value={password}
                      secureTextEntry={!passwordVisible}
                      onChangeText={(password) => setPassword(password)}
                    />
            </View>
                <TouchableOpacity style={styles.button} onPress={() => {
                    onHandleLogin()
                    }}>
                    <Text style={styles.item}>Login</Text>
                </TouchableOpacity>
                <View>
                <Pressable style={styles.para}
                onPress={() => {props.navigation.replace("signUp")}}>
                        <Text>
                        Don't have an account? 
                        </Text>
                        <Text style={{color: "purple", fontWeight: "bold", fontSize: 15}}>
                            {'  '}Sign up
                        </Text>
                    </Pressable>
                </View>
                </View>
            </View>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4',
        width: overallWidth,
        display: 'flex',
        flex: 1,
        alignItems: "center",
    },
    input : {
        marginBottom: 40,
        width: overallWidth * 0.8,
        padding: 10,
        paddingLeft: 20,
        borderRadius: 20, 
        borderColor: "purple", 
        borderWidth: 0, 
        borderBottomWidth: 1
    },
    button: {
        backgroundColor: "purple",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: overallWidth * 0.8,
        height: 35,
        borderRadius: 15

    },
    item: {
        color: "white"
    },
    para: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 20
    },
    svgCurve: {
        position: 'absolute',
        width: Dimensions.get('window').width
      },
      headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        // change the color property for better output
        color: '#fff',
        textAlign: 'center',
        top: 70
      }
})

