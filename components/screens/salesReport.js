import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import React, { useState } from "react";
import { PresentData } from "./screenComponents/presentData";

//inventory app
class SalesReport extends React.Component {
    constructor(props){
        super(props);
        this.keyslist = Object.keys(this.props.sales);
        this.valueslist = Object.values(this.props.sales);
        this.state = {
            object: this.props.sales
        }
    }
    render(){
        return (
            <View style={styles.Container}>
                <View style={styles.main}>
                    <PresentData keysList={[...this.keyslist]} valuesList={[...this.valueslist]}  dataObject={{...this.props.sales}}/>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    inventory: state.inventoryList.value,
    sales: state.salesLog.value
  })
  
  const mapDispatchToProps = () => ({
    
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps()
  )(SalesReport)

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
        backgroundColor: "#D9D9D9",
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
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 45, backgroundColor: '#E7E6E1' },
    oddRow: {backgroundColor: '#F7F6E7'}
})

