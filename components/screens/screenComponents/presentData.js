import React, { useState } from "react";
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { SelectList } from 'react-native-dropdown-select-list';
import sort from "./sortFuncForReports";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

export const PresentData = ({keysList, valuesList, category}) => {

    //dropdown menu to select time period
    const [required, setRequired] = React.useState(366);
    
    const data = [
        {key:'366', value:'All'},
        {key:'7', value:'1 week'},
        {key:'30', value:'1 month'},
        {key:'90', value:'3 months'},
        {key:'180', value:'6 months'},
        {key:'365', value:'1 year'},
    ]
    tableHead = ['Name', 'Quantity', category, 'date']
    widthArr = [110, 70, 70, 140]
    const tableData = [];
    orderedList = sort([...keysList], [...valuesList], required)[1]
    const [values, setValues] = React.useState(orderedList);

    const handleFilter = (requiredInterval) => {
        setRequired(requiredInterval)
        // orderedLists = sort(keysList, valuesList, requiredInterval)
        setValues(orderedList)
    }


    values.forEach(values => {
        let valuesList = Object.values(values)
        let keyList = Object.keys(values)
        for (i=0; i < keyList.length; i++){
            let rowData = []
            rowData.push(keyList[i])
            rowData.push(valuesList[i].quantity)
            rowData.push(valuesList[i][category])
            rowData.push(valuesList[i].dateUI)
            tableData.push(rowData)
        }
        tableData.push([' ', ' ', ' ', ' '])
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
            <View style={{zIndex: 1, width: '40%', padding: 20, position: 'relative'}}>
                <SelectList 
                    setSelected={(val) => handleFilter(val)} 
                    data={data} 
                    save="key"
                    searchPlaceholder="Filter"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 45, backgroundColor: '#E7E6E1' },
    oddRow: {backgroundColor: '#F7F6E7'}
})