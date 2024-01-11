import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet, Alert,Dimensions } from "react-native";
import {signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../config/firebase";
import { newAccount, updateActiveAccount } from "../redux/authenticationSlice";
import { showMessage } from "react-native-flash-message";
import { cancel, check, checkFields } from "./newProduct";
import { createUserWithEmailAndPassword } from "firebase/auth";
import WavyHeader from "./wavyHeader";

const overallWidth = Dimensions.get('window').width;

//inventory app
export default function SignUp(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [branch, setBranch] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const onSignup = () => {
        //added username which wasnt there in the tutorial
        console.log(`email: ${email} and password: ${password}`);
        if (email !== "" && password !== ""){
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => console.log("Signup success"))
                .catch((err) => {
                    console.log(err.message);
                    return Alert.alert("Signup error", err.message)}
                    )
        }
    }

        return (
            <View style={styles.Container}>
                <WavyHeader customStyles={styles.svgCurve} />
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Sign Up</Text>
                </View>
                <View style={{top: (Dimensions.get('window').height)/3}}>
                    <View style={{width: "100%"}}>
                        <TextInput
                          style={styles.input}
                          placeholder="Enter your email"
                          placeholderTextColor="grey"
                          editable={true}
                          value={email}
                          onChangeText={(name) => {
                            setEmail(name );
                        }
                        }
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="New password"
                          placeholderTextColor={"grey"}
                          editable={true}
                          secureTextEntry={true}
                          value={password}
                          onChangeText={(newPassword) => setPassword(newPassword )}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="Add branch name"
                          placeholderTextColor={"grey"}
                          editable={true}
                          value={branch}
                          keyboardType={"visible-password"}
                          onChangeText={(branch) => setBranch({ branch })}
                        />
                    </View>
                    <TouchableOpacity style={styles.button}  onPress={() => onSignup()}>
                        <Text style={styles.item}>Register</Text>
                    </TouchableOpacity>
                    <View style={styles.para}>
                        <Text>Already have an account  </Text>
                        <Pressable onPress={() => {props.navigation.push("signIn")}}>
                            <Text style={{color: "purple", fontWeight: "bold", fontSize: 15}}>
                                Sign in
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }


const styles = StyleSheet.create({
    Container: {
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
