import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Table, TableWrapper, Row } from 'react-native-table-component';
import React from "react"
import moment from "moment/moment";
import { bulkRemove } from "../redux/productsListSlice";
import { connect } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { check } from "./newProduct";

//inventory app
class Receipt extends React.Component {
    constructor(props){
        super(props);
        this.cart = Object.values(this.props.route.params.cart);
        this.state = {
            tableHead: ['Name', 'Unit Price $', 'Quantity', 'Total $'],
            widthArr: [170, 70, 70, 70]
        }
    }

    render(){
        const state = this.state;
        const tableData = [];
        total = 0
        this.cart.forEach(function(value) {
          const rowData = [];
        
          rowData.push(value.productName);
          rowData.push(value.pricePerUnit);
          rowData.push(value.quantity);
          val = parseInt(value.quantity)*parseInt(value.pricePerUnit)
          total += val;
          rowData.push(val);
          console.log(moment(value.dateCode, "YYYYMMDD").fromNow())

        
          tableData.push(rowData);
        })
        tableData.push(['Total', '__', '__', total])

        return (
            <View style={styles.Container}>
                <View style={styles.main}>
                    <View style={styles.container}>
                        <ScrollView horizontal={true}>
                          <View>
                            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
                            </Table>
                            <ScrollView style={styles.dataWrapper}>
                              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                {
                                  tableData.map((rowData, index) => (
                                        <Row
                                          key={index}
                                          data={rowData}
                                          widthArr={state.widthArr}
                                          style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                                          textStyle={styles.text}
                                        />
                                  ))
                                }
                              </Table>
                            </ScrollView>
                          </View>
                        </ScrollView>
                    </View>
                    <View style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-evenly"}}>
                      <TouchableOpacity style={{...styles.button, backgroundColor: "#bb0606"}}>
                          <Text style={{color: "white"}}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={() => {
                        this.props.bulkRemove(this.props.route.params.cart)
                        showMessage({
                          message: `  Success`,
                          type: "success",
                          autoHide: true,
                          duration: 2000,
                          icon: () => check
                        });
                        this.props.navigation.pop()
                        }}>
                          <Text style={{color: "white"}}>Confirm</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{...styles.button, marginTop: 20, marginBottom: 20}} onPress={() => this.props.navigation.navigate("ProcessSale")}>
                          <Text style={{color: "white"}}>Add more</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const mapStateToProps = state => ({
  inventory: state.inventoryList.value
})

const mapDispatchToProps = () => ({
  bulkRemove
})

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(Receipt)



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
        paddingTop: 40
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
    container: { flex: 1, padding: 16, paddingTop: 0, backgroundColor: "#D9D9D9" },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' }
})