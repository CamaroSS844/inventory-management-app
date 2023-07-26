import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import React from "react";
import { PresentData } from "./screenComponents/presentData";

//inventory app
class SalesReport extends React.Component {
    constructor(props){
        super(props);
        this.keyslist = Object.keys(this.props.sales);
        this.valueslist = Object.values(this.props.sales);
    }
    render(){
        console.log('sales screen')
        return (
            <View style={styles.Container}>
                <View style={styles.main}>
                    <PresentData keysList={[...this.keyslist]} valuesList={[...this.valueslist]}  category={'totalValue'}/>
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
        height: "93%",
        backgroundColor: "#D9D9D9",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        paddingTop: 30
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

