import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet, Dimensions, ScrollView } from "react-native";
import { connect } from "react-redux";
import {
  LineChart,
  BarChart,
  PieChart,
  StackedBarChart
} from "react-native-chart-kit";
import React from "react"
import sortFuncForReports from "./screenComponents/sortFuncForReports";
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#10ab10",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#008000",
  backgroundGradientToOpacity: 0.6,
  color: (opacity = 1) => `black`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const SalesBarGraph = ({keys, values, names}) => {
  list = sortFuncForReports(keys, values, 30)
  label = [];
  info = []
  list[1].forEach(val => {
    Object.keys(val).forEach(val => label.push(names[val]))
    Object.values(val).forEach(val => info.push(parseInt(val.quantity)))
  })
  data = {
    labels: label,
    datasets: [
      {
        data: info,
      }
    ]
  };
  return (
    <BarChart
      data={data}
      width={screenWidth}
      height={230}
      yAxisLabel=" "
      chartConfig={chartConfig}
      verticalLabelRotation={0}
    />
  )
}
const removalsBarGraph = ({keys, values, names}) => {
  list = sortFuncForReports(keys, values, 30)
  label = [];
  info = []
  list[1].forEach(val => {
    Object.keys(val).forEach(val => label.push(names[val]))
    Object.values(val).forEach(val => info.push(parseInt(val.quantity)))
  })
  data = {
    labels: label,
    datasets: [
      {
        data: info,
      }
    ]
  };
  return (
    <BarChart
      data={data}
      width={screenWidth}
      height={230}
      yAxisLabel=" "
      chartConfig={chartConfig}
      verticalLabelRotation={0}
    />
  )
}



//inventory app
class ReportSummary extends React.Component {
    constructor(props){
        super(props);
        this.inventory = Object.values(this.props.inventory);
        this.removals = [];
        this.removalsVal = Object.values(this.props.removals).forEach(value => {
          this.removals.push(Object.values(value));
        });
        this.sales = [];
        this.salesVal = Object.values(this.props.sales).forEach(value => {
          this.sales.push(Object.values(value));
        });
        this.stockingLog = [];
        this.stockingLogVal = Object.values(this.props.stockingLog).forEach(value => {
          this.stockingLog.push(Object.values(value));
        });
    }

    render(){
      let total = 0;
      let stockInHand = 0;
      let totalRemovals = 0;
      let totalSales = 0;
      let totalStockingLog = 0;
      this.inventory.forEach(item => {
          total += parseInt(item.quantity)
          stockInHand += parseInt(item.quantity)
      })
      this.removals.forEach(item => {
        item.forEach(val => {
          total += parseInt(val.quantity)
          totalRemovals += parseInt(val.quantity)
        })
      })
      this.sales.forEach(item => {
        item.forEach(val => {
          total += parseInt(val.quantity)
          totalSales += parseInt(val.quantity)
        })
      })
      this.stockingLog.forEach(item => {
        item.forEach(val => {
          total += parseInt(val.quantity)
          totalStockingLog += parseInt(val.quantity)
        })
      })


      const data = [
        {
          name: "In Hand",
          population: parseInt(stockInHand),
          color: "green",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "OUT",
          population: parseInt(totalRemovals) + parseInt(totalSales),
          color: "#F00",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "IN",
          population: totalStockingLog,
          color: "yellow",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        }
      ]


        return (
            <View style={styles.Container}>
              <ScrollView style={{flex: 1}}>
                <View style={styles.main}>
                  <Text style={{paddingTop: 20}}>Overall stock</Text>
                  <PieChart
                    data={data}
                    width={300}
                    height={120}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"5"}
                    center={[0, 5]}
                    absolute
                  />

                  <Text style={{padding: 20}}>Summary of Transactions for the last 30 days</Text>

                  <Text style={{padding: 20}}>Sales summary</Text>
                  <SalesBarGraph keys={[...Object.keys(this.props.sales)]}  values={[...Object.values(this.props.sales)]} names={{...this.props.productName}}/>
                  <Text style={{padding: 20}}>Damaged and Expired goods</Text>
                  <SalesBarGraph keys={[...Object.keys(this.props.removals)]}  values={[...Object.values(this.props.removals)]} names={{...this.props.productName}}/>

                </View>
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = state => ({
  inventory: state.inventoryList.value,
  stockingLog: state.stockingLog.value,
  removals: state.removalsLog.value,
  sales: state.salesLog.value,
  productName: state.productLog.value
})

const mapDispatchToProps = () => ({
  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(ReportSummary)


const styles = StyleSheet.create({
    Container: {
        backgroundColor: "#CF8DB9", 
        height: "100%",
        display: "flex",
        justifyContent: "flex-end"
    },
    main: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        width: "100%",
        height: "90%",
        paddingBottom: 40,
        backgroundColor: "#D9D9D9",
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

