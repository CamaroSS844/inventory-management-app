import React, { useState } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { toggleRegState } from "../../redux/compReg";
import { Dimensions } from "react-native";
import { TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { auth, database } from "../../../config/firebase";
import { FieldValue, addDoc, collection, collectionGroup, doc, setDoc, updateDoc, writeBatch } from "firebase/firestore";

const overallWidth = Dimensions.get("window").width;


export default function CompanyReg(){
    const [newCompany, setNewCompany] = useState("");
    const dispatch = useDispatch();
    const checkFields = () => {
        if (newCompany === "") {
          Alert.alert("Please fill in all fields");
          return false;
        }
        return true;
    }
    
    async function handleRegister(){
        if (checkFields()) {
            const payload = {
                companyName: newCompany,
                createdBy: auth.currentUser.uid,
                createdat: new Date().toString(),
                noOfEmployees: 1,
            };

            const batch = writeBatch(database); 

            const newCompanyDoc = doc(database, `CompaniesList/list/${newCompany}/companyInfo`);
            batch.set(newCompanyDoc, payload);

            const companyListDoc = doc(database, "CompaniesList/list");
            batch.update(companyListDoc, {[newCompany]: true});

            try {
                await batch.commit();
            } catch (e) {
                console.log(e);
            }

            Alert.alert("Registration successful");
        }
    }

    return (
            <Pressable style={styles.Container} onPress={() => {
                console.log('pressed, closing modal from content')
                dispatch(toggleRegState())
                }}>
                <Pressable style={styles.main} onPress={() => null}>
                    <Text style={{...styles.sectHead, fontSize: 24}}>Register</Text>

                    <TextInput
                          style={styles.input}
                          placeholder="Enter Company Name or Invite Code"
                          placeholderTextColor="grey"
                          value={newCompany}
                          onChangeText={(name) => {
                            setNewCompany(name);
                          }}
                    />
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity style={styles.button} onPress={() => handleRegister()}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Pressable>
            )
}


  const styles = StyleSheet.create({
    Container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
        position: "absolute",
        backgroundColor: "#00000050",
        width: "100%",
        height: "100%"
    },
    main: {
        backgroundColor: '#fff',
        color: '#000',
        width: overallWidth * 0.95,
        display: 'flex',
        justifyContent: 'flex-start',
        padding: 15,
        shadowColor: "#000",
        elevation: 6,
        borderRadius: 5
    },
    button: {
        backgroundColor: "#7123d7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 45,
        borderRadius: 30,
        marginTop: 20,
        width: "40%",
        marginBottom: 10,
    },
    sectHead: {
        alignSelf: "flex-start",
        padding: 5,
        paddingLeft: 10,
        fontSize: 15,
        fontFamily: 'serif'
    },
    input : {
        marginBottom: 20,
        marginTop: 25,
        width: "95%",
        padding: 10,
        borderRadius: 20,
        borderBottomColor: 'purple',
        borderBottomWidth: 1,
        color: '#000'
    },
    buttonText: {
        color: "#fff",
        fontSize: 15,
    },
})
  