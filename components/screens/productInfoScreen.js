import { View, Text, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import React from "react"

//inventory app
class InfoScreen extends React.Component {
    constructor(props){
        super(props);
        // this.product = this.props.product
        /* 
        this.props.route.params
        name, unit price, quantity, total ,date, barcode 
        */

        this.barcodeNumber = this.props.route.params.info;
        this.productName = this.props.inventory[this.barcodeNumber].productName.toUpperCase();
        this.date = this.props.inventory[this.barcodeNumber].dateUI;
    }

    render(){
        return (
            <View style={styles.Container}>
                <View style={styles.main}>
                    <Text>{this.productName}</Text>
                    <View style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <View style={styles.Item}>
                            <Text>Product Name: </Text><Text>{this.productName}</Text>
                        </View>
                        <View style={styles.Item}>
                            <Text>Barcode Number: </Text><Text>{this.barcodeNumber}</Text>
                        </View>
                        <View style={styles.Item}>
                            <Text>Sales in the last month</Text><Text>20</Text>
                        </View>
                        <View style={styles.Item}>
                            <Text>Product Logs</Text>
                        </View>

                    </View>

                </View>
            </View>
        )
    }
}


const mapStateToProps = state => ({
    inventory: state.inventoryList.value
  })
  
  const mapDispatchToProps = () => ({})
  
  export default connect(
  mapStateToProps,
  mapDispatchToProps()
  )(InfoScreen)



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
        height: "90%",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        paddingTop: 50
    },
    Item: {
        width: "70%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15
    },
})
