import React from "react";
import { Table, Row } from 'react-native-table-component';
import { SelectList } from 'react-native-dropdown-select-list';
import sort from "./sortFuncForReports";
import { View, ScrollView, StyleSheet } from "react-native";

export class PresentData extends React.Component {
    constructor(props) {
      super(props);
      this.keysList = this.props.keysList;
      this.valuesList = this.props.valuesList;
      this.category = this.props.category;
      this.names = this.props.names
      this.state = {
        required: 366,
        data: [
          {key:'366', value:'All'},
          {key:'7', value:'1 week'},
          {key:'30', value:'1 month'},
          {key:'90', value:'3 months'},
          {key:'180', value:'6 months'},
          {key:'365', value:'1 year'},
      ],
      tableHead : ['Name', 'Quantity', this.category, 'date'],
      widthArr : [85, 60, 70, 130],
      values: sort([...this.keysList], [...this.valuesList], 366)[1],

      }
    }

    handleFilter = (requiredInterval) => {
      orderedLists = sort([...this.keysList], [...this.valuesList], requiredInterval)
      this.setState({values: orderedLists[1]})
  }
    
    render() {
    const tableData = [];

    this.state.values.forEach(values => {
        let valuesList = Object.values(values)
        let keyList = Object.keys(values)
        for (i=0; i < keyList.length; i++){
            let rowData = []
            rowData.push(this.names[keyList[i]])
            rowData.push(valuesList[i].quantity)
            rowData.push(valuesList[i][this.category])
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
                    <Row data={this.state.tableHead} widthArr={this.state.widthArr} style={styles.header} textStyle={styles.text}/>
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
                                widthArr={this.state.widthArr}
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
                    setSelected={(val) => this.handleFilter(val)} 
                    data={this.state.data} 
                    save="key"
                    searchPlaceholder="Filter"
                />
            </View>
        </View>
    )
}
}

const styles = StyleSheet.create({
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 50, backgroundColor: '#E7E6E1' },
    oddRow: {backgroundColor: '#F7F6E7'}
})