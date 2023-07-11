import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import React from "react"

//inventory app
export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            newPassword: "",
            confirmPassword: "",
            branch: ""
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
                          placeholder="New password"
                          placeholderTextColor={"black"}
                          editable={true}
                          value={this.state.newPassword}
                          keyboardType={"visible-password"}
                          onChangeText={(newPassword) => this.setState({ newPassword })}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="Confirm Password"
                          placeholderTextColor={"black"}
                          editable={true}
                          value={this.state.confirmPassword}
                          keyboardType={"visible-password"}
                          onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="Add branch name"
                          placeholderTextColor={"black"}
                          editable={true}
                          value={this.state.branch}
                          keyboardType={"visible-password"}
                          onChangeText={(branch) => this.setState({ branch })}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate("Dashboard")}}>
                        <Text style={styles.item}>Register</Text>
                    </TouchableOpacity>
                    <View style={styles.para}>
                        <Text>Already have an account  </Text>
                        <Pressable onPress={() => {this.props.navigation.navigate("sign in")}}>
                            <Text style={{color: "#476C6C", fontWeight: "bold", fontSize: 15}}>
                                Sign in
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }
}



//fireapp
// import { View, Text, Button } from "react-native";
// import React from "react"
// export default List = (props) => {
//     return (
//         <View>
//             <Text>List</Text>
//             <Button onPress={() => props.navigation.navigate("my details")}
//             title="open Details"
//             />
//         </View>
//     )
// }


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
        paddingTop: 50
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
        alignItems: "center",
        paddingTop: 20
    }
})
