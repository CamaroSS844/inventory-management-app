import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Table, TableWrapper, Row } from 'react-native-table-component';
import React from "react"
import moment from "moment/moment";
import { current } from "@reduxjs/toolkit";


const sort = (dates, values, requirement) => {
    //sort the data according to specified criteria
    //return the sorted data
    //dates is an array of dates and values is an array of values
    // requirement is a string
    //requirement can be 1, 2, 3, 4, 5, 6 'months'
    //but default is 6 months

    // dates = Object.keys(data)
    // dataValues = Object.values(data)
    dataDates = dates
    a = moment()
        for(let i = 0; i < dates.length; i++){
            let date1 = a.diff(dates[i], 'days')
            let date2 = moment().diff(dates[i+1], 'days')
            if(date1>date2){
                if(dates[i+1] == undefined){
                    break;
                }
                x= dates[i]
                y= values[i]
                dates[i] = dates[i+1]
                values[i] = values[i+1]
                dates[i+1] = x
                values[i+1] = y
            }
            for(let j = 0; j < dates.length; j++){

                let date3 = a.diff(dates[j], 'days')
                let date4 = moment().diff(dates[j+1], 'days')
                if(date3>date4){
                    if(dates[j+1] == undefined){
                        break;
                    }
                    x= dates[j]
                    y= values[j]
                    dates[j] = dates[j+1]
                    values[j] = values[j+1]
                    dates[j+1] = x
                    values[j+1] = y
                }
            }
        }
        return [dates, values]
}



export const PresentData = ({keysList, dataObject}) => {
    tableHead = ['Name', 'Quantity', 'Total $', 'date']
    widthArr = [110, 70, 70, 140]
    const tableData = [];
    values = Object.values(dataObject)
    orderedLists = sort(keysList, values, 'months')
    dates = orderedLists[0]
    values = orderedLists[1]
    values.forEach(values => {
        let valuesList = Object.values(values)
        let keyList = Object.keys(values)
        for (i=0; i < keyList.length; i++){
            let rowData = []
            rowData.push(keyList[i])
            rowData.push(valuesList[i].quantity)
            rowData.push(valuesList[i].totalValue)
            rowData.push(valuesList[i].dateUI)
            tableData.push(rowData)
        }
        tableData.push([' '])
    })
    return (
        <View>
            <ScrollView horizontal={true}>
                <View>
                  <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                    <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text}/>
                  </Table>
                  <ScrollView style={styles.dataWrapper}>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                      {
                        tableData.map((rowData, index) => {
                          localStyle = StyleSheet.compose(styles.row, index % 2 === 1 && styles.oddRow);
                          return (
                              <Row
                                key={index}
                                data={rowData}
                                widthArr={widthArr}
                                style={{...localStyle[0], ...localStyle[1]}}
                                textStyle={{...styles.text}}
                              />
                        )
                      }
                        )
                      }
                    </Table>
                  </ScrollView>
                </View>
            </ScrollView>
        </View>
    )
}


//inventory app
class SalesReport extends React.Component {
    constructor(props){
        super(props);
        this.list = Object.keys(this.props.sales);
        this.state = {
            object: this.props.sales
        }
    }
    render(){
        return (
            <View style={styles.Container}>
                <View style={styles.main}>
                    <Text>Latest Transaction First</Text>
                    <PresentData keysList={this.list} dataObject={this.props.sales}/>
                    <TouchableOpacity>
                        <Text></Text>
                    </TouchableOpacity>
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

