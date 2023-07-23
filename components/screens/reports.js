import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import {
  LineChart,
  BarChart,
  PieChart,
  StackedBarChart
} from "react-native-chart-kit";
import React from "react"
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};
const data = [
  {
    name: "Seoul",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Beijing",
    population: 527612,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "New York",
    population: 8538000,
    color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Moscow",
    population: 11920000,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
];

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
        this.state = {
            total: 0
        }
    }

    // deconstruct = () => {
    //   let 
    // }

  // calculateTotal = () => {
      
  // }

    render(){
      let total = 0;
      let stockInHand = 0;
      let totalRemovals = 0;
      let totalSales = 0;
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


      console.log(`total: ${total}`)
      console.log(`stock in hand: ${stockInHand}`)
      console.log(`totalRemovals: ${totalRemovals}`)
      console.log(`totalSales: ${totalSales}`)


        return (
            <View style={styles.Container}>
                <View style={styles.main}>
                <PieChart
                  data={data}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  accessor={"population"}
                  backgroundColor={"transparent"}
                  paddingLeft={"15"}
                  center={[10, 50]}
                  absolute
                />
                </View>
            </View>
        )
    }
}


const mapStateToProps = state => ({
  inventory: state.inventoryList.value,
  stockingLog: state.stockingLog.value,
  removals: state.removalsLog.value,
  sales: state.salesLog.value
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
        paddingBottom: 40
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

