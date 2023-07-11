import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet, ScrollView } from "react-native";
import { Table, TableWrapper, Row } from 'react-native-table-component';
import React from "react"

//inventory app
export default class Receipt extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tableHead: ['Name', 'Unit Price $', 'Quantity', 'Total $'],
        widthArr: [170, 70, 70, 70]
        }
    }

    render(){
        const state = this.state;
        const tableData = [];
        for (let i = 0; i < 10; i += 1) {
          const rowData = [];
          for (let j = 0; j < 4; j += 1) {
            rowData.push(`${i}${j}`);
          }
          tableData.push(rowData);
        }

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
                                    <TouchableOpacity>
                                        <Row
                                          key={index}
                                          data={rowData}
                                          widthArr={state.widthArr}
                                          style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                                          textStyle={styles.text}
                                        />
                                    </TouchableOpacity>
                                  ))
                                }
                              </Table>
                            </ScrollView>
                          </View>
                        </ScrollView>
                    </View>
                    <View style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-evenly"}}>
                      <TouchableOpacity style={{...styles.button, backgroundColor: "#bb0606"}}>
                          <Text style={{color: "white"}}>Clear</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button}>
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