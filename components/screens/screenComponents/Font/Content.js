import React from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const user = <FontAwesome5 name='user-circle' size={70}/>

export default function Content() {
        return (
                <Pressable style={styles.Container} onPress={() => null}>
                    <Pressable style={{paddingTop: 20}}>
                        <Pressable >
                            {user}
                        </Pressable>
                        <Text style={{fontSize: 25, paddingTop: 10}}>Hie Trinity!</Text>
                    </Pressable>
                <View  style={{width: '100%', display: 'flex', alignItems: 'flex-start', marginTop: 30}}>
                    <Pressable style={{width: '100%', paddingTop: 10,paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey'}}>
                        <Text style={{fontSize: 15}}>Dashboard</Text>
                    </Pressable>
                    <Pressable style={{width: '100%', paddingTop: 10,paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey'}}>
                        <Text style={{fontSize: 15}}>Sales Returns</Text>
                    </Pressable>
                    <Pressable style={{width: '100%', paddingTop: 10,paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey'}}>
                        <Text style={{fontSize: 15}}>Purchases Returns</Text>
                    </Pressable>
                    <Pressable style={{width: '100%', paddingTop: 10,paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey'}}>
                        <Text style={{fontSize: 15}}>Customers</Text>
                    </Pressable>
                    <Pressable style={{width: '100%', paddingTop: 10,paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey'}}>
                        <Text style={{fontSize: 15}}>Reports</Text>
                    </Pressable>
                    <Pressable style={{width: '100%', paddingTop: 10,paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey'}}>
                        <Text style={{fontSize: 15}}>Settings</Text>
                    </Pressable>
                    <Pressable style={{width: '100%', paddingTop: 10,paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey'}}>
                        <Text style={{fontSize: 15}}>About</Text>
                    </Pressable>

                    <Text  style={{fontSize: 20, paddingTop: 10,paddingBottom: 10, paddingTop: 20}}  >Settings</Text>

                    <Pressable style={{width: '100%', paddingTop: 10,paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey'}}>
                        <Text style={{fontSize: 15}}>Profile</Text>
                    </Pressable>
                    <Pressable style={{width: '100%', paddingTop: 10,paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey'}}>
                        <Text style={{fontSize: 15}}>Change Password</Text>
                    </Pressable>
                    <Pressable style={{width: '100%', paddingTop: 10,paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey'}}>
                        <Text style={{fontSize: 15}}>Notification Settings</Text>
                    </Pressable>
                    <Pressable style={{width: '100%', paddingTop: 10,paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey'}}>
                        <Text style={{fontSize: 15}}>Logout</Text>
                    </Pressable>
                </View>
                </Pressable>
                )
} 


  const styles = StyleSheet.create({
    Container: {
        padding: 30,
        paddingTop: 0,
        borderRadius: 20,
        width: '100%',
        height: '100%',
        display: 'flex', alignItems: 'center'
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row", 
    },
    divisons: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        margin: 10,
        alignSelf: "baseline",
    },
    line : {
        backgroundColor: "none",
        paddingRight: 20
    },
    divHead: {
        alignSelf: "flex-start",
        padding: 3,
        fontSize: 13
    },
    buttonText: {
        color: "red"
    },
    Line : {
        alignSelf: "center",
        borderRadius: 5, 
        marginTop: 0,
        width: 55,
        height: 5,
    },
    
})
  