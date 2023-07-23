import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import { connect } from "react-redux";
import React from "react"


//inventory app
class RestockingReport extends React.Component {
    constructor(props){
        super(props);
    }


    render(){
        return (
            <View style={styles.Container}>
                <View style={styles.main}>
                    <View>
                        <Text>Overall Stock</Text>
                        <Text></Text>
                    </View>
                </View>
            </View>
        )
    }
}


const mapStateToProps = state => ({
    inventory: state.inventoryList.value,
  })
  
  const mapDispatchToProps = () => ({
    
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps()
  )(RestockingReport)

const styles = StyleSheet.create({
    Container: {
        backgroundColor: "#CF8DB9", 
        height: "100%",
        display: "flex",
        justifyContent: "flex-end"
    },
    main: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "90%",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        paddingTop: 20
    },
    div: {
        display: "flex",
        flexDirection: "row",
        padding: 20,
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "baseline"
    },
})

