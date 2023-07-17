import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import moment from 'moment/moment';

const minSort = (list) => {
  for (let i = 0; i < list.length - 1; i++) {
    if ((parseInt(list[i + 1].quantity) - parseInt(list[i + 1].minLevel)) < (parseInt(list[i].quantity) - parseInt(list[i].minLevel))) {
      let temporalList = list[i];
      list[i] = list[i + 1];
      list[i + 1] = temporalList;
      minSort(list);
    }
  }
  return list;
};


const ageSort = (array) => {
  for (let i = 0; i < list.length - 1; i++) {
    if ((parseInt(list[i + 1].quantity) - parseInt(list[i + 1].minLevel)) < (parseInt(list[i].quantity) - parseInt(list[i].minLevel))) {
      let temporalList = list[i];
      list[i] = list[i + 1];
      list[i + 1] = temporalList;
      ageSort(list);
    }
  }
  return list;
}

class InventoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Name', 'Unit Price $', 'Quantity', 'Total $', 'Date '],
      widthArr: [170, 70, 70, 70, 200],
      inventoryArray:  minSort(Object.values(this.props.inventory))
    }
  }

  sort = () => {
    // this.setState({
    //   inventoryArray: ageSort(this.state.inventoryArray)
    // });
    this.setState({
      inventoryArray: minSort(this.state.inventoryArray)
    });
  }

  render() {
    const state = this.state
    const tableData = [];
    total = 0
    this.state.inventoryArray.forEach(function(value) {
      const rowData = [];

      rowData.push(value.productName);
      rowData.push(value.pricePerUnit);
      rowData.push(value.quantity);
      rowData.push(parseInt(value.quantity)*parseInt(value.pricePerUnit));
      rowData.push(value.dateUI);
      rowData.push(value.barcodeNumber);
      console.log(moment(value.dateCode, "YYYYMMDD").fromNow())
      

      tableData.push(rowData);
    })

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.sort()} style={{marginBottom: 30}}>
          <Text>sort</Text>
        </TouchableOpacity>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  tableData.map((rowData, index) => {
                    localStyle = StyleSheet.compose(styles.row, index % 2 === 1 && styles.oddRow);
                    return (
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("prod info", {info: rowData[5]})} key={index}>
                        <Row
                          key={index}
                          data={rowData}
                          widthArr={state.widthArr}
                          style={{...localStyle[0], ...localStyle[1]}}
                          textStyle={{...styles.text}}
                        />
                    </TouchableOpacity>
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
}

const mapStateToProps = state => ({
  inventory: state.inventoryList.value
})

const mapDispatchToProps = () => ({})

export default connect(
mapStateToProps,
mapDispatchToProps()
)(InventoryTable)

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#CF8DB9" },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' },
  oddRow: {backgroundColor: '#F7F6E7'}
});