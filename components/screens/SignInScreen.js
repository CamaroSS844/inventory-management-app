import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import { unlockApp, updateActiveAccount } from "../redux/authenticationSlice";
import React from "react";
import { showMessage } from "react-native-flash-message";
import { cancel } from "./newProduct";
import WavyHeader from "./wavyHeader";

const overallWidth = Dimensions.get('window').width;

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
            <View style={styles.container}>
                <WavyHeader customStyles={styles.svgCurve} />
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Login</Text>
                </View>
                <View style={{top: (Dimensions.get('window').height)/3}}>
                <View style={{width: "100%"}}>
                    <TextInput
                          style={{...styles.input}}
                          placeholder="Enter your full name"
                          placeholderTextColor="grey"
                          editable={true}
                          value={this.state.name}
                          onChangeText={(name) => this.setState({ name })}
                        />
                        <TextInput
                          style={{...styles.input, marginBottom: 80}}
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
                            <Text style={{color: "purple", fontWeight: "bold", fontSize: 15}}>
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
    container: {
        backgroundColor: '#fff',
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
        top: 105
      }
})

