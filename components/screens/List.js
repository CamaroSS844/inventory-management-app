import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { newAccount, updateActiveAccount } from "../redux/authenticationSlice";
import { showMessage } from "react-native-flash-message";
import { cancel, check, checkFields } from "./newProduct";
import React from "react"


//inventory app
class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            newPassword: "",
            confirmPassword: "",
            branch: ""
        }
    }

    handleRegister = (obj) => {
        if(this.state.newPassword === this.state.confirmPassword){
            this.props.newAccount({
                [this.state.name]: {password: this.state.newPassword, branch: this.state.branch}
            })
            showMessage({
                message: `  Account created`,
                type: "success",
                autoHide: true,
                duration: 2000,
                icon: () => check
            })
            this.props.updateActiveAccount(this.state.name)
            this.setState({name: "", newPassword: "", confirmPassword: "", branch: ""}) 
            this.props.navigation.push("Dashboard")
        }else{
            showMessage({
                message: `  Passwords don't match`,
                type: "danger",
                autoHide: true,
                duration: 2000,
                icon: () => cancel
              })
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
                          placeholderTextColor="grey"
                          editable={true}
                          value={this.state.name}
                          onChangeText={(name) => this.setState({ name })}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="New password"
                          placeholderTextColor={"grey"}
                          editable={true}
                          secureTextEntry={true}
                          value={this.state.newPassword}
                          onChangeText={(newPassword) => this.setState({ newPassword })}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="Confirm Password"
                          placeholderTextColor={"grey"}
                          editable={true}
                          secureTextEntry={true}
                          value={this.state.confirmPassword}
                          onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="Add branch name"
                          placeholderTextColor={"grey"}
                          editable={true}
                          value={this.state.branch}
                          keyboardType={"visible-password"}
                          onChangeText={(branch) => this.setState({ branch })}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        checkFields({...this.state}, this.handleRegister)
                        }}>
                        <Text style={styles.item}>Register</Text>
                    </TouchableOpacity>
                    <View style={styles.para}>
                        <Text>Already have an account  </Text>
                        <Pressable onPress={() => {this.props.navigation.push("sign in")}}>
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



const mapStateToProps = state => ({
    inventory: state.inventoryList.value,
    sales: state.salesLog.value,
    authenticate: state.accounts.value
  })
  
  const mapDispatchToProps = () => ({
    newAccount,
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
