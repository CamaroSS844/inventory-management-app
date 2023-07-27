import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { unlockApp, updateActiveAccount } from "../redux/authenticationSlice";
import React from "react";
import { showMessage } from "react-native-flash-message";
import { Entypo } from "@expo/vector-icons";
import { cancel } from "./newProduct";



//inventory app
class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            password: "",
            passwordVisible: false,
            passBW: 0,
            userBW: 0
        }
    }

    handleLogin = () => {
        if(this.props.authenticate[this.state.name]){
            if(this.props.authenticate[this.state.name].password === this.state.password){
                this.setState({passBW: 0, userBW: 0})
                this.props.updateActiveAccount(this.state.name)
                this.props.navigation.push("Dashboard")
            }else{
                showMessage({
                    message: `  Wrong password`,
                    type: "danger",
                    autoHide: true,
                    duration: 2000,
                    icon: () => cancel
                  })
                  this.setState({passBW: 2})
            }
        }else{
            showMessage({
                message: `  Username ${this.state.name} not found`,
                description: `  Please check your username and try again`,
                type: "danger",
                autoHide: true,
                duration: 8000,
                icon: () => cancel
              })
              this.setState({userBW: 2})
        }
    }

    render(){
        return (
            <View style={styles.Container}>
            <View style={styles.main}>
                <View style={{width: "100%", display: "flex", alignItems: "center"}}>
                    <TextInput
                          style={{...styles.input, borderWidth: this.state.userBW}}
                          placeholder="Enter your full name"
                          placeholderTextColor="grey"
                          editable={true}
                          value={this.state.name}
                          onChangeText={(name) => this.setState({ name })}
                        />
                        <TextInput
                          style={{...styles.input, borderWidth: this.state.passBW}}
                          placeholder="Enter your password"
                          placeholderTextColor={"grey"}
                          editable={true}
                          value={this.state.password}
                          secureTextEntry={!this.state.passwordVisible}
                          onChangeText={(password) => this.setState({ password })}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        this.handleLogin()
                        }}>
                        <Text style={styles.item}>Login</Text>
                    </TouchableOpacity>
                    <View>
                    <Pressable style={styles.para}
                    onPress={() => {this.props.navigation.replace("sign up")}}>
                            <Text>
                            Don't have an account? 
                            </Text>
                            <Text style={{color: "#476C6C", fontWeight: "bold", fontSize: 15}}>
                                {'  '}Sign up
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    inventory: state.inventoryList.value,
    sales: state.salesLog.value,
    authenticate: state.accounts.value
  })
  
  const mapDispatchToProps = () => ({
    unlockApp,
    updateActiveAccount
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps()
  )(LoginScreen)

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
        borderRadius: 20, 
        borderColor: "red"
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

